import axios from "axios";
import { axiosConfig } from "../../lib/axios/axios.config";

export async function requestToBeProducer(data: string, token: string, axiosControler: AbortController) {
	try {
		const response = await axiosConfig.post("/v1/producerRequest/send", data, {
			signal: axiosControler.signal,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`
			}
		});
		const userData = response.data;

		return userData;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			if (error.response?.status === 409) {
				throw new Error("409");
			} else if (error.response?.status === 501) {
				throw new Error("501");
			} else {
				throw new Error(error.message);
			}
		}
	}
}
