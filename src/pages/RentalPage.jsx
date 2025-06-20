// import RentalEstimate from "../components/RentalEstimate";
import { MapPin, BedDouble, Bath, Ruler } from "lucide-react";
import SampleListing from '../data/SampleListing';
import ListingCard from "../components/ListingCard";


export default function RentalPage() {
  const listings = SampleListing; // should be an array of listing objects

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Rental Listings</h1>

      {/* 💡 This is the responsive grid layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {listings.map((listing, index) => (
          <ListingCard key={index} listing={listing} />
        ))}
      </div>
    </div>
  );
}