// utils/search.js

/**
 * Filters the flattened property variants based on user query filters.
 * @param {Array} properties - Flattened array from loadMergedProjects()
 * @param {Object} filters - { bhk, city, budget, readiness, locality, projectName }
 * @returns {Array} Filtered properties
 */
export const searchProjects = (properties, filters) => {
  return properties.filter((p) => {
    // --- 1️⃣ BHK filter ---
    const matchesBHK = filters.bhk ? p.BHK.toLowerCase() === filters.bhk.toLowerCase() : true;

    // --- 2️⃣ City filter ---
    const matchesCity = filters.city ? p.City.toLowerCase() === filters.city.toLowerCase() : true;

    // --- 3️⃣ Budget filter ---
    const matchesBudget = filters.budget ? p["Price (Raw)"] <= filters.budget : true;

    // --- 4️⃣ Readiness filter ---
    const matchesReadiness = filters.readiness
      ? p.Readiness.toLowerCase() === filters.readiness.toLowerCase()
      : true;

    // --- 5️⃣ Locality filter ---
    const matchesLocality = filters.locality
      ? p.Locality.toLowerCase().includes(filters.locality.toLowerCase())
      : true;

    // --- 6️⃣ Project name filter ---
    const matchesProjectName = filters.projectName
      ? p["Project Name"].toLowerCase().includes(filters.projectName.toLowerCase())
      : true;

    return (
      matchesBHK &&
      matchesCity &&
      matchesBudget &&
      matchesReadiness &&
      matchesLocality &&
      matchesProjectName
    );
  });
};
