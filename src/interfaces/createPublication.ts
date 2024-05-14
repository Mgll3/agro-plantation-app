import axios from "axios";
import { axiosConfig } from "../lib/axios/axios.config";
import { PlantationDemoType } from "../pages/management/publicationsDemoData";

export async function createPublication ( token: string, data: Stringified<PlantationDemoType>, axiosControler: AbortController ) {

	try{
		const response = await axiosConfig.post("/v1/publication/save", data, {
			signal: axiosControler.signal,
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${token}`,
			}
		});
		const publicationData = response.data;

		return publicationData;
	} catch (error) {
		if ( axios.isAxiosError(error)) {
			throw new Error(error.message);
		}
	}
}