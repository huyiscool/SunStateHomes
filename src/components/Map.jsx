import React from 'react';
import { GoogleMap, Marker, InfoWindow, useLoadScript } from '@react-google-maps/api';

export default function Map({ houseData }) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY, // or process.env
  });

  const [selected, setSelected] = React.useState(null);

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12}>
      {houseData.map((house) => (
        <Marker
          key={house.id}
          position={{ lat: house.latitude, lng: house.longitude }}
          onClick={() => setSelected(house)}
        />
      ))}

      {selected && (
        <InfoWindow
          position={{ lat: selected.latitude, lng: selected.longitude }}
          onCloseClick={() => setSelected(null)}
        >
          <div>
            <h3>{selected.title}</h3>
            <p>{selected.address}</p>
            <img src={selected.image_url} alt={selected.title} width="100" />
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
}