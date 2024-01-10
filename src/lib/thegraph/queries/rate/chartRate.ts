import { gql } from "@apollo/client";

import { utils } from "ethers";

export const chartRate = ({ currencyName, page = 0, first = 1000, searchDate = "0", networkId }) => {
	const currencyKey = currencyName && utils.formatBytes32String(currencyName);
	currencyName = currencyName[0] === "p" ? currencyName.substring(1) : currencyName;
	const skip = page * first;

	const RateMapping = (data) => {
		return {
			price: BigInt(data.price) * 10n ** 10n,
			low: BigInt(data.low) * 10n ** 10n,
			high: BigInt(data.high) * 10n ** 10n,
			timestamp: Number(data.timestamp),
		};
	};

	if (currencyName === "PERI") {
		return {
			url: "",
			query: gql`
				query {
					periChartRate(first: ${first}, skip: ${skip}, currencyKey: "${currencyKey}", network: ${networkId}) {
						timestamp
						price
						low
						high
						currencyKey
					}
				}
			`,
			variables: { currencyKey, skip, first, searchDate },
			mapping: ({ data }) => {
				return data.periChartRate.map((item) => RateMapping(item));
			},
			errorCallback: (e) => {
				console.log(e);
				return [
					RateMapping({
						price: 0,
						low: 0,
						high: 0,
						timestamp: 0,
					}),
				];
			},
			networkId,
		};
	} else {
		return {
			// ! 원본 값
			// url: "ChainLinkPriceFeed", // `ExchangeRates-${process.env.REACT_APP_ENV === 'production' ? 'Real' : 'Dev'}`,
			// query: gql`
			// 	query GetChartRates(
			// 		$currencyName: String!
			// 		$skip: Int!
			// 		$first: Int!
			// 		$searchDate: String!
			// 	) {
			// 		chartRates(
			// 			skip: $skip
			// 			first: $first
			// 			where: { currencyName: $currencyName, timestamp_gt: $searchDate }
			// 			orderBy: timestamp
			// 			orderDirection: asc
			// 		) {
			// 			price
			// 			low
			// 			high
			// 			timestamp
			// 		}
			// 	}
			// `,

			url: "",
			query: gql`
				query {
					aggregatorChartRates(
						skip: ${skip}
						take: ${first}
						currencyName: "${currencyName}"
						timestamp: ${searchDate}
					) {
						price
						low
						high
						timestamp
					}
				}
			`,
			variables: { currencyName, skip, first, searchDate },
			mapping: ({ data }) => {
				return data.aggregatorChartRates.map((item) => RateMapping(item));
			},
			errorCallback: (e) => {
				console.error("chartrate error! :",e);
				return [
					RateMapping({
						price: 0,
						low: 0,
						high: 0,
						timestamp: 0,
					}),
				];
			},
			networkId,
		};
	}
};
