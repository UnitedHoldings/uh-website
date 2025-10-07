"use client"; // if using Next.js App Router

import { MapContainer, TileLayer, Marker, Tooltip } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Custom maroon (#9b1c20) pin icon
const customIcon = L.icon({
  iconUrl: `data:image/svg+xml;utf8,
    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="41" viewBox="0 0 25 41">
      <path d="M12.5 0C5.6 0 0 5.6 0 12.5c0 9.4 12.5 28.5 12.5 28.5S25 21.9 25 12.5C25 5.6 19.4 0 12.5 0z" fill="%239b1c20"/>
      <circle cx="12.5" cy="12.5" r="5" fill="white"/>
    </svg>`,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
});

export default function BranchMap() {
  const branches = [
    { name: "Manzini – Head Office", phone: "+268 2508 6000", coords: [-26.4988, 31.3800], hours: "Mon–Fri: 8am–5pm" },
    { name: "Manzini 1", phone: "+268 2508 6124", coords: [-26.4985, 31.3812], hours: "Mon–Fri: 8am–5pm" },
    { name: "Matsapha", phone: "+268 2508 6125", coords: [-26.5167, 31.3167], hours: "Mon–Fri: 8am–5pm" },
    { name: "Ezulwini", phone: "+268 2508 6126", coords: [-26.4167, 31.2000], hours: "Mon–Fri: 8am–5pm" },
    { name: "Mbabane", phone: "+268 2508 6120", coords: [-26.3054, 31.1367], hours: "Mon–Fri: 8am–5pm" },
    { name: "Piggs Peak", phone: "+268 2508 6122", coords: [-25.9670, 31.2500], hours: "Mon–Fri: 8am–5pm" },
    { name: "Simunye", phone: "+268 2508 6127", coords: [-26.2020, 31.9330], hours: "Mon–Fri: 8am–5pm" },
    { name: "Siteki", phone: "+268 2508 6123", coords: [-26.4500, 31.9500], hours: "Mon–Fri: 8am–5pm" },
    { name: "Matata", phone: "+268 2508 6128", coords: [-27.0000, 31.6333], hours: "Mon–Fri: 8am–5pm" },
    { name: "Nhlangano", phone: "+268 2508 6121", coords: [-27.1167, 31.2000], hours: "Mon–Fri: 8am–5pm" },
    { name: "Buhleni", phone: "+268 3460 1767", coords: [-26.0333, 31.3167], hours: "Mon–Fri: 8am–5pm" },
    { name: "Hlathikhulu", phone: "N/A", coords: [-27.2167, 31.2167], hours: "Mon–Fri: 8am–5pm" },
  ];

  return (
    <MapContainer
      center={[-26.5, 31.4]} // Eswatini center
      zoom={8}
      style={{ height: "500px", width: "100%", background: "white" }}
    >
      {/* Option A: Pure white background (no TileLayer) */}
      {/* Option B: Light basemap with subtle roads */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
        url="https://cartodb-basemaps-a.global.ssl.fastly.net/light_all/{z}/{x}/{y}{r}.png"
      />

      {branches.map((branch, idx) => (
        <Marker key={idx} position={branch.coords} icon={customIcon}>
          <Tooltip>
            <strong>{branch.name}</strong>
            <br />
            📞 {branch.phone}
            <br />
            🕒 {branch.hours}
          </Tooltip>
        </Marker>
      ))}
    </MapContainer>
  );
}