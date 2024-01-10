import { gql } from "@apollo/client";

import { utils } from "ethers";

export const tokenTicker = ({ currencyName, networkId }) => {
    const currencyKey = currencyName && utils.formatBytes32String(currencyName);
    currencyName = currencyName[0] === "p" ? currencyName.substring(1) : currencyName;

    const RateMapping = (data) => {
        return {
            currencyKey: data.currencyKey,
            lastPrice: BigInt(data.lastPrice) * 10n ** 10n,
            low24hr: BigInt(data.low24hr) * 10n ** 10n,
            high24hr: BigInt(data.high24hr) * 10n ** 10n,
            change: BigInt(data.change) * 10n ** 10n,
            timestamp: Number(data.timestamp),
        };
    };

    return {
        url: "",
        query: gql`
			query {
				tokenTicker(currencyKey: "${currencyKey}") {
					currencyKey
					lastPrice
					low24hr
					high24hr
					change
					timestamp
				}
			}
		`,
        variables: { currencyKey },
        mapping: ({ data }) => {
            return RateMapping(data.tokenTicker);
        },
        errorCallback: (e) => {
            console.log(e);
            return [
                RateMapping({
                    currencyKey,
                    lastPrice: 0n,
                    low24hr: 0n,
                    high24hr: 0n,
                    chaing: 0n,
                    timestamp: 0,
                }),
            ];
        },
        networkId,
    };
};
