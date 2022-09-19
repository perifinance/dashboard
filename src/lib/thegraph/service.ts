import { ApolloClient, InMemoryCache } from "@apollo/client";
import { SUPPORTED_NETWORKS } from "configure/network";

export const get = ({ url, query, mapping, variables, errorCallback, networkId }) => {
	return new ApolloClient({
		// uri: "https://dex-api.peri.finance/dex/", // ! 임시 주석처리
		uri: "http://localhost:4000/",
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
