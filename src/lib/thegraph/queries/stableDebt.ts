import { gql } from "@apollo/client";
import { utils } from "ethers";

export const stableDebt = ({ networkId }) => {
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

	return {
		url: "",
		query: gql`
			query {
				stakeAmounts(skip: 0, first: 1000, network: "${network}") {
					id
					amount
					network
				}
			}
		`,
		variables: {},
		mapping: ({ data }) => {
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
