import axios from "axios";

export async function getAddressCoordinates(axiosControler: AbortController, address: string) {
	try {
		const response = await axios.get(
			`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`,
			{
				signal: axiosControler.signal
			}
		);
		if (response.data && response.data.length > 0) {
			const { lat, lon } = response.data[0];
			return { lat: parseFloat(lat), lon: parseFloat(lon) };
		} else {
			throw new Error("Address not found");
		}
	} catch (error) {
		if (axios.isAxiosError(error)) {
			throw new Error(error.message);
		}
	}
}
