// components/ListingCard.jsx
import { MapPin, BedDouble, Bath, Ruler } from "lucide-react";
import './ListingCard.css'; // Import the CSS file

export default function ListingCard({ listing }) {
  const {
    title,
    image,
    rent,
    address,
    city,
    state,
    zipcode,
    bedrooms,
    bathrooms,
    square_feet,
    description,
    contact_url,
  } = listing;

  return (
    <div className="listing-card">
      <div className="listing-card-image-container">
        <img
          src={image}
          alt={title}
          className="listing-card-image"
        />
      </div>

      <div className="listing-card-content">
        <h2 className="listing-card-title">{title}</h2>
        <p className="listing-card-rent">
          ${rent.toLocaleString()} / mo
        </p>
        <div className="listing-card-location">
          <MapPin />
          {city}, {state}
        </div>

        <div className="listing-card-details">
          <div className="listing-card-detail-item">
            <BedDouble />
            {bedrooms}
          </div>
          <div className="listing-card-detail-item">
            <Bath />
            {bathrooms}
          </div>
          <div className="listing-card-detail-item">
            <Ruler />
            {square_feet} ft²
          </div>
        </div>

        <a
          href={contact_url}
          target="_blank"
          rel="noopener noreferrer"
          className="listing-card-contact-button"
        >
          Contact
        </a>
      </div>
    </div>
  );
}
