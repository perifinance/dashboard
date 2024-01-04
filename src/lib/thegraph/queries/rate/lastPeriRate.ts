import { gql } from "@apollo/client";
import { utils } from "ethers";
export const lastPeriRate = ({ skip = 0, first = 1, networkId }) => {
	const currencyName = "PERI";
	const currencyKey = utils.formatBytes32String(currencyName);

	const RateMapping = (data) => {
		let price = 0n;
		try {
			price = BigInt(data.price);
		} catch (e) {}

		return {
			price,
			currencyName: data.currencyName,
		};
	};

	return {
		url: "",
		query: gql`
			query {
				exchangeRate(skip: ${skip}, first: ${first}, currencyKey: "${currencyKey}") {
					price
				}
			}
		`,
		variables: { currencyKey, skip, first },
		mapping: ({ data }) => {
			console.log("PERI data", data.exchangeRates);
			return RateMapping({ price: data.exchangeRates[0].price, currencyName: "PERI" });
		},
		errorCallback: () => {
			return RateMapping({ price: 0n, currencyName: "PERI" });
		},
		networkId,
	};
};
