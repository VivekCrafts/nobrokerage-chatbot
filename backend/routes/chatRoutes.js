import express from "express";
import { loadMergedProjects } from "../utils/csvLoader.js";
import { parseQuery } from "../utils/queryParser.js";
import { searchProjects } from "../utils/search.js";
import { generateSummaryWithProjects } from "../utils/summary.js";

const router = express.Router();

let cachedProjects = null;

(async () => {
  cachedProjects = await loadMergedProjects();
})();

router.post("/", (req, res) => {
  try {
    const { query } = req.body;
    if (!query) return res.status(400).json({ error: "Query is required." });

    const filters = parseQuery(query);
    const results = searchProjects(cachedProjects, filters);
    const summary = generateSummaryWithProjects(results, filters);
;

    res.json({ summary, results });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
