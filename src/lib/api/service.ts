import axios from "axios";

export const get = ({ url, params, mapping }) => {
	// const API_URL = process.env.REACT_APP_API_URL;
	const API_URL = "http://localhost:4000/api/v1/";

	axios.defaults.withCredentials = true;
	return axios({
		method: "get",
		url: API_URL + url,
		params,
	}).then((data) => mapping(data));
};
