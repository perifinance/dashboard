import { gql } from "@apollo/client";

import { utils } from "ethers";

export const stableDebt = ({ networkId }) => {
	const skip = 0;
	const first = 1000;
	const mapping = (data) => {
		const id = data.id.split("-");

		return {
			id: utils.parseBytes32String(id[0]),
			amount: BigInt(data.amount),
			networkId,
		};
	};

	let network;
	switch (networkId) {
		case 1:
			network = "ETHEREUM";
			break;
		case 56:
			network = "BSC";
			break;
		case 137:
			network = "POLYGON";
			break;
		case 1285:
			network = "MOONRIVER";
			break;
		default:
			network = "";
			break;
	}

	// console.log("network", networkId, network);
	// 39701982763780331075n

	return {
		url: "",
		query: gql`
			query {
				stakeAmounts(skip: ${skip}, first: ${first}, network: "${network}") {
					id
					amount
					network
				}
			}
		`,
		variables: {skip, first, network},
		mapping: ({ data }) => {
			// console.log(data);
			return data.stakeAmounts.map((item) => {
				return mapping(item);
			});
		},
		errorCallback: () => {
			return [
				{
					id: "USDC",
					amount: 0n,
					networkId,
				},
				{
					id: "DAI",
					amount: 0n,
					networkId,
				},
			];
		},
		networkId,
	};
};
