import { ApolloClient, InMemoryCache } from "@apollo/client";
import { SUPPORTED_NETWORKS } from "configure/network";

export const get = ({ url, query, mapping, variables, errorCallback, networkId }) => {
	// uri: process.env[`REACT_APP_${SUPPORTED_NETWORKS[networkId]}_THEGRAPH_URL`] + url,
	console.log(SUPPORTED_NETWORKS[networkId]);
	return new ApolloClient({
		uri: process.env[`REACT_APP_THEGRAPH_URL`] + url,
		cache: new InMemoryCache(),
		connectToDevTools: true,
	})
		.query({
			query,
			variables,
		})
		.then((data) => mapping(data))
		.catch(errorCallback);
};
