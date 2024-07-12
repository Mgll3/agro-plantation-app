import axios from "axios";
import { axiosConfig } from "../../lib/axios/axios.config";

export async function getPublicationsByPending(token: string, axiosControler: AbortController, page: string) {
	try {
		const response = await axiosConfig.get(`/v1/publication/pending/${page}`, {
			signal: axiosControler.signal,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`
			}
		});
		const publicationsData = response.data;

		return publicationsData;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			if (error.response?.status === 404) {
				throw new Error("404");
			} else {
				throw new Error(error.message);
			}
		}
	}
}