import pynths from "configure/coins/pynths";
import { lastPeriRate } from "../queries";
import { get } from "../service";
import dexNetworkId from "configure/network/dexNetworkId";

export const getLastPeriRates = () => {
	const promise = get(lastPeriRate({ networkId: dexNetworkId }));

	return promise.then((rates) => {
		let keys = {};
		keys[rates.currencyName] = rates.price;
		return keys;
	});
};
