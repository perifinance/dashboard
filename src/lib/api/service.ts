import axios from "axios";

export const get = ({ url, params, mapping }) => {
	// const API_URL = "https://dex-api.peri.finance/api/v1/";
	const API_URL = "http://localhost:4001/api/v1/";

	axios.defaults.withCredentials = true;
	return axios({
		method: "get",
		url: API_URL + url,
		params,
	}).then((data) => mapping(data));
};
