import React from "react";

function BusinessCard({ name, address }) {
  return (
    <div className="business-card">
      <h3>{name}</h3>
      <p>{address}</p>
    </div>
  );
}

export default BusinessCard;
