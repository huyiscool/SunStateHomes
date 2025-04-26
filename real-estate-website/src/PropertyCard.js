import React from "react";

const PropertyCard = ({ property }) => {
  return (
    <div style={styles.card}>
      <img src={property.image} alt={property.title} style={styles.image} />
      <h3>{property.title}</h3>
      <p>{property.price} - {property.beds} Beds, {property.baths} Baths</p>
      <button onClick={() => alert(`More details about ${property.title}`)}>
        View Details
      </button>
    </div>
  );
};

const styles = {
  card: {
    border: "1px solid #ddd",
    padding: "15px",
    width: "300px",
    textAlign: "center",
    margin: "10px",
  },
  image: {
    width: "100%",
  },
};

export default PropertyCard;
