// utils/summary.js

/**
 * Generate a human-readable summary for flattened property variants
 * @param {Array} properties - Filtered properties from searchProjects()
 * @param {Object} filters - Filters applied (bhk, city, budget, readiness, locality)
 * @returns {Array} Array of { property, summary }
 */
export const generateSummaryWithProjects = (properties, filters = {}) => {
  if (!properties.length) {
    return [
      {
        property: null,
        summary: "No properties found matching your search criteria.",
      },
    ];
  }

  return properties.map((p) => {
    const bhkFilter = filters.bhk || "Any BHK";
    const localityFilter = filters.locality ? ` near ${filters.locality}` : "";

    const summary = `${p.Readiness} project "${p["Project Name"]}" at ${p.Locality_Details} has ${p.BHK} priced at ${p.Budget}${localityFilter}`;

    return {
      property: p,
      summary,
    };
  });
};
