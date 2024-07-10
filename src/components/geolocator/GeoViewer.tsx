import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

// Fijar el icono para que Leaflet lo pueda mostrar correctamente
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import { CoordinatesType } from "../../pages/admin/AdminPublicationDetails";

const DefaultIcon = L.icon({
	iconUrl: icon,
	shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

type GeoViewerProps = {
	addressString: string;
	addressCoordinates?: CoordinatesType;
	plantationName: string;
};

export default function GeoViewer({ addressString, addressCoordinates, plantationName }: GeoViewerProps) {
	let lat: number, lon: number;
	if (addressCoordinates) {
		lat = addressCoordinates.lat;
		lon = addressCoordinates.lon;
	} else {
		lat = 1500;
		lon = 1500;
	}

	return (
		<MapContainer center={[lat, lon]} zoom={13} style={{ height: "100%", width: "100%" }}>
			<TileLayer
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
			/>
			<Marker position={[lat, lon]}>
				<Popup>
					{plantationName}
					<br />
					{addressString}
				</Popup>
			</Marker>
		</MapContainer>
	);
}
