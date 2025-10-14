// testBackend.js
import { loadMergedProjects } from "./utils/csvLoader.js"; // your updated CSV loader
import { parseQuery } from "./utils/queryParser.js";
import { searchProjects } from "./utils/search.js";
import { generateSummaryWithProjects } from "./utils/summary.js";

const testBackend = async () => {
  try {
    // 1️⃣ Load all projects
    const allProperties = await loadMergedProjects();
    console.log(`Total properties loaded: ${allProperties.length}`);

    // 2️⃣ Simulate a user query
    const query = "3BHK in Pune under 1.2 Cr";
    const filters = parseQuery(query);
    console.log("Parsed filters:", filters);

    // 3️⃣ Filter properties based on query
    const matchedProperties = searchProjects(allProperties, filters);
    console.log(`Found ${matchedProperties.length} matching property(s)`);

    // 4️⃣ Generate summaries
    const summaries = generateSummaryWithProjects(matchedProperties, filters);

    // 5️⃣ Print summaries
    summaries.forEach((s, idx) => {
      console.log(`\nProperty ${idx + 1}:`);
      console.log(s.summary);
    });

  } catch (err) {
    console.error("Error testing backend:", err);
  }
};

testBackend();
