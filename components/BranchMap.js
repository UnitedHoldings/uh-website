"use client"; // if using Next.js App Router

import { MapContainer, TileLayer, Marker, Tooltip } from "react-leaflet";
import L from "leaflet";

// Fix default marker icon issue in Next.js
import "leaflet/dist/leaflet.css";
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

export default function BranchMap() {
  // Example branch data
  const branches = [
    {
      name: "Mbabane Branch",
      hours: "Mon–Fri: 8am–5pm",
      coords: [-26.3054, 31.1367],
    },
    {
      name: "Manzini Branch",
      hours: "Mon–Sat: 9am–6pm",
      coords: [-26.4988, 31.3800],
    },
  ];

  return (
    <MapContainer
      center={[-26.5, 31.4]} // Eswatini center
      zoom={8}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {branches.map((branch, idx) => (
        <Marker key={idx} position={branch.coords}>
          <Tooltip>
            <strong>{branch.name}</strong>
            <br />
            {branch.hours}
          </Tooltip>
        </Marker>
      ))}
    </MapContainer>
  );
}