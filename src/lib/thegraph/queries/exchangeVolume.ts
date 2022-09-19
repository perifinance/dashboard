import { gql } from "@apollo/client";
import { utils } from "ethers";

export const exchageVolume = ({ pynthName, networkId, searchDate = "0" }) => {
	const currencyKey = pynthName && utils.formatBytes32String(pynthName);
	const mapping = (data) => {
		console.log("exchangeVolume data", data);
		return {
			id: data.id,
			amount: BigInt(data.amount),
			currencyName: utils.parseBytes32String(data.currencyKey),
			timestamp: data.timestamp,
			usdVolume: BigInt(data.usdVolume),
		};
	};

	console.log("args", currencyKey, searchDate);

	return {
		url: "",
		query: gql`
			query {
				exchangeVolumes({ currencyKey: ${currencyKey}, timestamp: ${searchDate} }) {
					id
					currencyKey
					amount
					usdVolume
					timestamp
				}
			}
		`,
		variables: {
			currencyKey,
			searchDate,
		},
		mapping: ({ data }) => {
			return data.exchangeVolumes.length > 0
				? data.exchangeVolumes.map((item) => mapping(item))
				: [
						{
							id: 0,
							amount: 0n,
							currencyName: pynthName,
							timestamp: "0",
							usdVolume: 0n,
						},
				  ];
		},
		errorCallback: () => {
			return [
				{
					id: 0,
					amount: 0n,
					currencyName: pynthName,
					timestamp: "0",
					usdVolume: 0n,
				},
			];
		},
		networkId,
	};
};
