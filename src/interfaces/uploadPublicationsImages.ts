import axios from "axios";
import { axiosConfig } from "../lib/axios/axios.config";

export async function uploadPublicationsImages(
	token: string,
	data: FormData,
	axiosControler: AbortController,
) {
	try {
		const response = await axiosConfig.post(
			"/v1/publication/saveImages",
			data,
			{
				signal: axiosControler.signal,
				headers: {
					"Content-Type": "multipart/form-data",
					Authorization: `Bearer ${token}`,
				},
				timeout: 125000,
			},
		);
		const publicationData = response.data;

		return publicationData;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			throw new Error(error.message);
		}
	}
}
