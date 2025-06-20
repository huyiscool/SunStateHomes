import { useEffect, useState } from "react";


function RentalEstimate({ address, city, state, zipcode }) {
  const [rentalData, setRentalData] = useState(null);

  useEffect(() => {
    const fetchRentalData = async () => {
      const url = new URL("https://api.rentcast.io/v1/properties/rental-value");
      url.searchParams.append("address", address);
      url.searchParams.append("city", city);
      url.searchParams.append("state", state);
      url.searchParams.append("zipcode", zipcode);

      const res = await fetch(url, {
        headers: {
          "X-Api-Key": process.env.RENTCAST_API_KEY,
        },
      });
      const data = await res.json();
      setRentalData(data);
    };

    fetchRentalData();
  }, [address, city, state, zipcode]);

  if (!rentalData) return <p>Loading...</p>;

  return (
    <div>
      <h3>Rent Estimate: ${rentalData.rent}</h3>
      <p>{rentalData.confidence_level} confidence level</p>
      <p>Bedrooms: {rentalData.bedrooms}, Bathrooms: {rentalData.bathrooms}</p>
      <p>Sq Ft: {rentalData.square_feet}</p>
    </div>
  );
}

export default RentalEstimate;
