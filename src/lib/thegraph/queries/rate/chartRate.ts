import { gql } from "@apollo/client";
import { utils } from "ethers";

export const chartRate = ({ currencyName, page = 0, first = 1000, searchDate = "0", networkId }) => {
	const currencyKey = currencyName && utils.formatBytes32String(currencyName);
	currencyName = currencyName[0] === "p" ? currencyName.substring(1) : currencyName;
	const skip = page * first;

	const RateMapping = (data) => {
		return {
			price: BigInt(data.price),
			low: BigInt(data.low),
			high: BigInt(data.high),
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
					chartRates(
						skip: ${skip}
						first: ${first}
						currencyName: "${currencyName}"
						timestamp_gt: ${searchDate}
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
				return data.chartRates.map((item) => RateMapping(item));
			},
			errorCallback: () => {
				console.error("chartrate error! :");
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
