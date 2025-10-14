import express from "express";
import { loadMergedProjects } from "../utils/csvLoader.js";

const router = express.Router();

/**
 * GET /api/project/:slug
 * Returns project details based on slug
 */
router.get("/:slug", async (req, res) => {
  try {
    const { slug } = req.params;
    const allProjects = await loadMergedProjects();

    // Use the slug stored in the backend (from CSV merge)
    const project = allProjects.find((p) => p.slug.toLowerCase() === slug.toLowerCase());

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json(project);
  } catch (error) {
    console.error("Error fetching project:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

/**
 * GET /api/project
 * Returns all projects with slugs
 */
router.get("/", async (req, res) => {
  try {
    const allProjects = await loadMergedProjects();
    res.json(allProjects); // each project already has 'slug'
  } catch (error) {
    console.error("Error loading projects:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
