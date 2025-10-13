import React, { useEffect, useState } from "react";
import axios from "axios";
import BusinessCard from "./BusinessCard";

const API_BASE_URL = "http://127.0.0.1:5000/api"; // Flask backend URL

function BusinessList() {
  const [businesses, setBusinesses] = useState([]);

  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/businesses`, {
          params: { category: "restaurant", location: "Toronto" },
        });
        // Set the businesses array
        setBusinesses(response.data.businesses);
      } catch (error) {
        console.error("Error fetching businesses:", error);
      }
    };

    fetchBusinesses();
  }, []);

  return (
    <div>
      <h2>Business Results</h2>
      {businesses.length === 0 ? (
        <p>No businesses found</p>
      ) : (
        businesses.map((b, index) => (
          <BusinessCard
            key={index}
            name={b.name || "Business Name"}
            address={b.address || "Business Address"}
          />
        ))
      )}
    </div>
  );
}

export default BusinessList;
