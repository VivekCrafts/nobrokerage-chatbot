import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./ProjectDetails.css";

const ProjectDetails = () => {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const BASE_API = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";
        const res = await axios.get(`${BASE_API}/api/project/${slug}`);
        setProject(res.data);
      } catch (err) {
        console.error("Error fetching project:", err);
        setError("Project not found 😢");
      }
    };
    fetchProject();
  }, [slug]);

  if (error) return <div className="error">{error}</div>;
  if (!project) return <div className="loading">Loading...</div>;

  const {
    "Project Name": projectName,
    BHK,
    Budget,
    "Carpet Area": carpetArea,
    Readiness,
    City,
    Locality,
    Amenities = [],
    Locality_Details,
    slug: projectSlug,
  } = project;

  // ✅ Full frontend URL ensures opening in a new tab
  const BASE_FRONTEND = process.env.REACT_APP_FRONTEND_URL || "http://localhost:3000";
  const PUBLIC_URL = `${BASE_FRONTEND}/project/${projectSlug}`;

  return (
    <div className="project-details">
      <Link to="/" className="back-btn">← Back to Search</Link>

      <h2>{projectName}</h2>

      <div className="project-info">
        <p><b>City:</b> {City}</p>
        <p><b>Locality:</b> {Locality}</p>
        <p><b>BHK:</b> {BHK}</p>
        <p><b>Budget:</b> {Budget}</p>
        <p><b>Carpet Area:</b> {carpetArea} sq.ft</p>
        <p><b>Readiness:</b> {Readiness}</p>
        {Amenities.length > 0 && <p><b>Amenities:</b> {Amenities.join(", ")}</p>}
        <p><b>Address:</b> {Locality_Details}</p>
      </div>

      <a
        href={PUBLIC_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="view-btn"
      >
        View on Website
      </a>
    </div>
  );
};

export default ProjectDetails;
