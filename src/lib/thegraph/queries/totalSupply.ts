import { gql } from "@apollo/client";

const network = {
	1: 'ETHEREUM',
	56: 'BSC',
	137: 'POLYGON',
    1285: 'MOONRIVER'
}

export const totalSupply = ({ pynthName, networkId }) => {

	const mapping = (data) => {
		const pynthName = data.pynthName === "pINCH" ? "p1INCH" : data.pynthName;
		return {
			totalSupply: BigInt(data.totalSupply),
			pynthName: pynthName,
			networkId,
		};
	};

	return {
		// url: `ProxyERC20${pynthName}-${process.env.REACT_APP_ENV === 'production' ? 'Real' : 'Dev'}`,
		url: "",
		query: gql`
			query {
				totalSupply(pynthName: "${pynthName}", network: "${network[networkId]}") {
					totalSupply
					pynthName
				}
			}
		`,
		variables: {},
		mapping: ({ data }) => {
			return mapping(data.totalSupply);
		},
		errorCallback: () => {
			return {
				totalSupply: 0n,
				pynthName,
				networkId,
			};
		},
		networkId,
	};
};
