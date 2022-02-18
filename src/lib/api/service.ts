import axios from 'axios'

export const get = ({url, params, mapping}) => {
    const API_URL = process.env.REACT_APP_API_URL;
    return axios({
		method: 'get',
		url: API_URL + url,
		params
	})
    .then((data) => mapping(data))
}

