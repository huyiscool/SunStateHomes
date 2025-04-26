import React from "react";
import PropertyCard from "./PropertyCard";

const properties = [
  { title: "Luxury Villa", price: "$500,000", beds: 4, baths: 3, image: "/images/house1.jpg" },
  { title: "Modern Apartment", price: "$350,000", beds: 2, baths: 2, image: "/images/house2.jpg" }
];

const PropertyList = () => {
  return (
    <section style={{ display: "flex", justifyContent: "center" }}>
      {properties.map((property, index) => (
        <PropertyCard key={index} property={property} />
      ))}
    </section>
  );
};

export default PropertyList;
