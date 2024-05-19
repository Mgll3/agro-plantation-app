import axios from "axios";
import { axiosConfig } from "../lib/axios/axios.config";

export async function deletePublication ( token: string, id: number, axiosControler: AbortController ) {

	try{
		const response = await axiosConfig.delete(`/v1/publication/${id}`, {
			signal: axiosControler.signal,
			headers: {
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