import axios from "axios";
import { axiosConfig } from "../../lib/axios/axios.config";


export async function getPublicationsByUser ( token: string, axiosControler: AbortController, page: string ) {

	try{
		const response = await axiosConfig.get(`/v1/publication/user/${page}`, {
			signal: axiosControler.signal,
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${token}`,
			}
		});
		const publicationsData = response.data;

		return publicationsData;
	} catch (error) {
		if ( axios.isAxiosError(error)) {
			throw new Error(error.message);
		}
	}
}