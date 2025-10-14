import fs from "fs";
import csv from "csv-parser";

/**
 * Utility function to safely parse a string as an integer.
 * @param {string | number} str
 * @returns {number}
 */
const safeParseInt = (str) => {
  const num = parseInt(String(str), 10);
  return isNaN(num) ? 0 : num;
};

/**
 * Formats price in Indian Rupees to Lakhs or Crores
 * @param {string | number} priceInRupees
 * @returns {string}
 */
const formatBudget = (priceInRupees) => {
  const price = safeParseInt(priceInRupees);
  if (price === 0) return "Price On Request";

  if (price >= 10000000) {
    return `₹${(price / 10000000).toFixed(2)} Cr`;
  }
  return `₹${(price / 100000).toFixed(2)} L`;
};

/**
 * Extracts BHK type
 */
const getBHK = (type) => {
  const typeStr = String(type).trim().toUpperCase();
  const match = typeStr.match(/(\d+BHK)/);
  if (match) return match[1];
  return typeStr.includes("STUDIO") ? "Studio" : typeStr;
};

/**
 * Extracts city from full address
 */
const getCity = (fullAddress) => {
  const address = String(fullAddress).toLowerCase();
  if (address.includes("mumbai")) return "Mumbai";
  if (address.includes("pune") || address.includes("pimpri-chinchwad")) return "Pune";
  return "Other";
};

/**
 * Normalizes project readiness status
 */
const getReadiness = (status) => {
  return String(status || "")
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase()) || "Unknown";
};

/**
 * Load CSV file
 */
const loadCSV = (path) =>
  new Promise((resolve, reject) => {
    const data = [];
    const fullPath = `./data/${path}`;
    fs.createReadStream(fullPath)
      .pipe(csv())
      .on("data", (row) => data.push(row))
      .on("end", () => resolve(data))
      .on("error", (err) => {
        console.error(`Error loading CSV at ${fullPath}:`, err.message);
        reject(err);
      });
  });

/**
 * Generate slug for project
 */
const generateSlug = (project, configId = "") => {
  const name = String(project.projectName || "").trim().toLowerCase().replace(/\s+/g, "-");
  const locality = String(project.locality || "").trim().toLowerCase().replace(/\s+/g, "-");
  const city = String(project.city || "").trim().toLowerCase().replace(/\s+/g, "-");
  const id = String(project.id || configId || "").trim();
  return `${name}-${locality}-${city}-${id}`;
};

/**
 * Load and merge all project CSV data
 */
export const loadMergedProjects = async () => {
  try {
    const projects = await loadCSV("project.csv");
    const addresses = await loadCSV("ProjectAddress.csv");
    const configs = await loadCSV("ProjectConfiguration.csv");
    const specs = await loadCSV("ProjectConfigurationVariant.csv");

    // Create lookup maps
    const addressMap = addresses.reduce((map, a) => {
      if (a.projectId) map.set(a.projectId.trim(), a);
      return map;
    }, new Map());

    const configMap = configs.reduce((map, c) => {
      if (c.id) map.set(c.id.trim(), c);
      return map;
    }, new Map());

    const projectMap = projects.reduce((map, p) => {
      if (p.id) map.set(p.id.trim(), p);
      return map;
    }, new Map());

    // Merge specs
    const mergedProperties = specs
      .map((spec) => {
        const configId = spec.configurationId?.trim();
        const config = configMap.get(configId);
        if (!config) {
          console.warn(`Skipping spec ${spec.id}: No config for ID ${configId}`);
          return null;
        }

        const projectId = config.projectId?.trim();
        const project = projectMap.get(projectId);
        const address = addressMap.get(projectId);

        const fullAddress = address?.fullAddress || project?.localityId || "";
        const slug = project?.slug || generateSlug(project, configId);

        return {
          "Project Name": project?.projectName || "Unnamed Project",
          BHK: getBHK(config.type),
          Budget: formatBudget(spec.price),
          "Price (Raw)": safeParseInt(spec.price),
          Readiness: getReadiness(project?.status),
          City: getCity(fullAddress),
          Locality: address?.landmark || "N/A",
          Locality_Details: fullAddress,
          "Carpet Area": safeParseInt(spec.carpetArea),
          Project_ID: projectId,
          Config_ID: configId,
          Amenities: (spec.amenities?.split(",") || project?.amenities?.split(",") || []).slice(0, 3),
          slug,
          URL: `/project/${slug}`,
        };
      })
      .filter((item) => item !== null);

    console.log(`Successfully merged ${mergedProperties.length} property variants.`);
    return mergedProperties;
  } catch (error) {
    console.error("Failed to load projects:", error.message);
    return [];
  }
};
