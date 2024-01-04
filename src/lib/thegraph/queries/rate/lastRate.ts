import { gql } from "@apollo/client";

import { utils } from "ethers";
export const lastRate = ({ currencyKeys = undefined, skip = 0, first = 1, networkId }) => {
	currencyKeys = currencyKeys[0] === "p" ? currencyKeys.substring(1) : currencyKeys;

	const RateMapping = (data) => {
		let price = 0n;

		try {
			price = BigInt(data.price);
		} catch (e) {}

		return {
			price,
			currencyName: data.currencyKeys[0] !== "p" ? "p" + data.currencyKeys : data.currencyKeys,
		};
	};

	return {
		// url: "ChainLinkPriceFeed", // `ExchangeRates-${process.env.REACT_APP_ENV === 'production' ? 'Real' : 'Dev'}`,
		url: "",
		query: /* currencyName?*/gql`
				query {
					aggregatorLastRates(currencyKeys: "${currencyKeys}") {
						price
						currencyName
					}
				}
			`
			/* : gql`
					query {
						aggregatorLastRates(skip: 0, first: 1) {
							price
							currencyName
						}
					}
			  ` */,
		variables: { currencyKeys},
		mapping: ({ data }) => {
			if (currencyKeys === "pUSD" || currencyKeys === "USD") {
				return RateMapping({ price: 1000000000000000000n, currencyKeys });
			} else {
				return RateMapping({ price: BigInt(data.aggregatorLastRates[0].price) * 10000000000n, currencyKeys });
			}
		},
		errorCallback: (e) => {
			console.log(e);
			return RateMapping({ price: 0n, currencyKeys });
		},
		networkId,
	};
};
