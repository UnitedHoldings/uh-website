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
    // data/branches.js
    const branches = [
        {
            name: "Manzini – Head Office",
            phone: "+268 2508 6000",
            coords: [-26.4988, 31.3800],
            hours: "Mon–Fri: 8am–5pm",
        },
        {
            name: "Manzini 1",
            phone: "+268 2508 6124",
            coords: [-26.4985, 31.3812],
            hours: "Mon–Fri: 8am–5pm",
        },
        {
            name: "Matsapha",
            phone: "+268 2508 6125",
            coords: [-26.5167, 31.3167],
            hours: "Mon–Fri: 8am–5pm",
        },
        {
            name: "Ezulwini",
            phone: "+268 2508 6126",
            coords: [-26.4167, 31.2000],
            hours: "Mon–Fri: 8am–5pm",
        },
        {
            name: "Mbabane",
            phone: "+268 2508 6120",
            coords: [-26.3054, 31.1367],
            hours: "Mon–Fri: 8am–5pm",
        },
        {
            name: "Piggs Peak",
            phone: "+268 2508 6122",
            coords: [-25.9670, 31.2500],
            hours: "Mon–Fri: 8am–5pm",
        },
        {
            name: "Simunye",
            phone: "+268 2508 6127",
            coords: [-26.2020, 31.9330],
            hours: "Mon–Fri: 8am–5pm",
        },
        {
            name: "Siteki",
            phone: "+268 2508 6123",
            coords: [-26.4500, 31.9500],
            hours: "Mon–Fri: 8am–5pm",
        },
        {
            name: "Matata",
            phone: "+268 2508 6128",
            coords: [-27.0000, 31.6333],
            hours: "Mon–Fri: 8am–5pm",
        },
        {
            name: "Nhlangano",
            phone: "+268 2508 6121",
            coords: [-27.1167, 31.2000],
            hours: "Mon–Fri: 8am–5pm",
        },
        {
            name: "Buhleni",
            phone: "+268 3460 1767",
            coords: [-26.0333, 31.3167],
            hours: "Mon–Fri: 8am–5pm",
        },
        {
            name: "Hlathikhulu",
            phone: "N/A",
            coords: [-27.2167, 31.2167],
            hours: "Mon–Fri: 8am–5pm",
        },
    ];

    return (
        <MapContainer
            center={[-26.5, 31.4]} // Eswatini center
            zoom={8}
            style={{ height: "500px", width: "100%" }}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
                url="https://cartodb-basemaps-a.global.ssl.fastly.net/light_all/{z}/{x}/{y}{r}.png"
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