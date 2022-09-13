import { gql } from "@apollo/client";
import { utils } from "ethers";

export const exchangeCount = ({ networkId, searchDate = "0" }) => {
	const mapping = (data) => {
		return {
			...data,
		};
	};

	return {
		url: `Exchanger-${process.env.REACT_APP_ENV === "production" ? "Real" : "Dev"}`,
		query: gql`
			query {
				exchangeCounts(where: { timestamp_gt: ${searchDate} }) {
					id
					count
				}
			}
		`,
		variables: {
			searchDate,
		},
		mapping: ({ data }) => {
			return data.exchangeCounts.length > 0
				? data.exchangeCounts.map((item) => mapping(item))
				: [
						{
							id: 0,
							count: 0,
						},
				  ];
		},
		errorCallback: () => {
			return [
				{
					id: 0,
					count: 0,
				},
			];
		},
		networkId,
	};
};
