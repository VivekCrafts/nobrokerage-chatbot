import React from "react";
import "./PropertyCard.css";

const PropertyCard = ({ property }) => {
  if (!property) return null;

  const {
    "Project Name": projectName,
    BHK,
    Budget,
    "Carpet Area": carpetArea,
    Readiness,
    City,
    Locality,
    Amenities = [],
    slug,
  } = property;

  const BASE_FRONTEND = process.env.REACT_APP_FRONTEND_URL || "http://localhost:3000";
  const PUBLIC_URL = `${BASE_FRONTEND}/project/${slug}`;

  return (
    <div className="property-card">
      <h3 className="property-title">{projectName}</h3>
      <p className="property-info">{City}, {Locality}</p>
      <p className="property-info">{BHK} | {Budget} | {carpetArea} sq.ft</p>
      <p className="property-readiness">
        {Readiness === "READY_TO_MOVE" ? "Ready to Move" : "Under Construction"}
      </p>
      {Amenities.length > 0 && (
        <p className="property-amenities">
          Amenities: {Amenities.slice(0, 3).join(", ")}
        </p>
      )}
      {/* ✅ Open project in a new tab */}
      <a
        href={PUBLIC_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="property-cta"
      >
        View Project
      </a>
    </div>
  );
};

export default PropertyCard;
