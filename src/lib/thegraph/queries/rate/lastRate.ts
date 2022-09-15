import { gql } from "@apollo/client";
import { utils } from "ethers";
export const lastRate = ({ currencyName = undefined, skip = 0, first = 1, networkId }) => {
	// const currencyKey = currencyName && utils.formatBytes32String(currencyName);
	currencyName = currencyName[0] === "p" ? currencyName.substring(1) : currencyName;

	const RateMapping = (data) => {
		let price = 0n;
		try {
			price = BigInt(data.price);
		} catch (e) {}

		return {
			price,
			currencyName: data.currencyName[0] !== "p" ? "p" + data.currencyName : data.currencyName,
		};
	};

	return {
		// url: "ChainLinkPriceFeed", // `ExchangeRates-${process.env.REACT_APP_ENV === 'production' ? 'Real' : 'Dev'}`,
		url: "",
		query: currencyName
			? gql`
					query {
						aggregatorLastRates(skip: ${skip}, first: ${first}, id: ${currencyName}) {
							price
							currencyName
						}
					}
			  `
			: gql`
					query {
						aggregatorLastRates(skip: 0, first: 1) {
							price
							currencyName
						}
					}
			  `,
		variables: { currencyName, skip, first },
		mapping: ({ data }) => {
			console.log("lastRate data", data);
			if (currencyName === "pUSD" || currencyName === "USD") {
				return RateMapping({ price: 1000000000000000000n, currencyName });
			} else {
				return RateMapping(data.aggregatorLastRates[0]);
			}
		},
		errorCallback: () => {
			return RateMapping({ price: 0n, currencyName });
		},
		networkId,
	};
};
