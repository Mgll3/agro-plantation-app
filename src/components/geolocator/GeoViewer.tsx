import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";

// Fijar el icono para que Leaflet lo pueda mostrar correctamente
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import { CoordinatesType } from "../../pages/admin/AdminPublicationDetails";
import { useEffect } from "react";

const DefaultIcon = L.icon({
	iconUrl: icon,
	shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

type GeoViewerProps = {
	addressString: string;
	addressCoordinates?: CoordinatesType;
	plantationName: string;
	isGeomapInfoLoaded?: boolean;
};

export default function GeoViewer({
	addressString,
	addressCoordinates,
	plantationName,
	isGeomapInfoLoaded
}: GeoViewerProps) {
	let lat: number, lon: number;
	if (addressCoordinates) {
		lat = addressCoordinates.lat;
		lon = addressCoordinates.lon;
	} else {
		lat = -34.61315;
		lon = -58.37723;
	}

	function ChangeView() {
		const map = useMap();

		useEffect(() => {
			map.setView([lat, lon]);
		}, [addressCoordinates]);

		return null;
	}

	//Si isGeomapInfoLoaded es "true" es que se ha llegado a hacer la petición al servidor. Si dado ese caso "lat" sigue siendo -34.61315 es porque no se ha encontrado la dirección indicada por el usuario.
	if (isGeomapInfoLoaded && lat === -34.61315) {
		return (
			<div className="flex justify-center items-center w-full h-full">
				<p
					className="text-[1.7rem] text-brandingDarkGreen font-lato font-semibold drop-shadow-smallText
				custom-950:text-[2rem]"
				>
					No se ha podido obtener la dirección
				</p>
			</div>
		);
	} else {
		return (
			<MapContainer center={[lat, lon]} zoom={13} style={{ height: "100%", width: "100%" }}>
				<TileLayer
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				/>
				<ChangeView />
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
}
