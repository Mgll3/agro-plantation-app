import axios from "axios";
import { axiosConfig } from "../lib/axios/axios.config";

export async function getPublicationById(token: string, axiosControler: AbortController, id: number) {
	try {
		const response = await axiosConfig.get(`/v1/publication/${id}`, {
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
			if (error.response?.status === 401) {
				throw new Error("401");
			} else {
				throw new Error(error.message);
			}
		}
	}
}
