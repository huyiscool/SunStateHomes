// components/ListingCard.jsx
import { MapPin, BedDouble, Bath, Ruler } from "lucide-react";

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
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300">
      <img
        src={image}
        alt={title}
        className="w-full h-48 object-cover"
      />

      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        <p className="text-blue-600 font-bold text-md mt-1">
          ${rent.toLocaleString()} / mo
        </p>
        <div className="text-sm text-gray-500 mt-1 flex items-center">
          <MapPin className="w-4 h-4 mr-1" />
          {city}, {state}
        </div>

        <div className="flex justify-between text-sm text-gray-600 mt-4">
          <div className="flex items-center gap-1">
            <BedDouble className="w-4 h-4" />
            {bedrooms}
          </div>
          <div className="flex items-center gap-1">
            <Bath className="w-4 h-4" />
            {bathrooms}
          </div>
          <div className="flex items-center gap-1">
            <Ruler className="w-4 h-4" />
            {square_feet} ft²
          </div>
        </div>

        <a
            href={contact_url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 block text-center bg-blue-600 text-white py-2 rounded-lg text-sm hover:bg-blue-700 transition"
          >
        Contact
      </a>
      </div>
    </div>
  );
}