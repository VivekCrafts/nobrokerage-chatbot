import React from "react";
import { Link } from "react-router-dom";
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

  return (
    <div className="property-card">
      <h3 className="property-title">{projectName}</h3>
      <p className="property-info">
        {City}, {Locality}
      </p>
      <p className="property-info">
        {BHK} | {Budget} | {carpetArea} sq.ft
      </p>
      <p className="property-readiness">
        {Readiness === "READY_TO_MOVE" ? "Ready to Move" : "Under Construction"}
      </p>

      {Amenities.length > 0 && (
        <p className="property-amenities">
          Amenities: {Amenities.slice(0, 3).join(", ")}
        </p>
      )}

      {/* ✅ Open within the same page using React Router */}
      <Link to={`/project/${slug}`} className="property-cta">
        View Project
      </Link>
    </div>
  );
};

export default PropertyCard;
