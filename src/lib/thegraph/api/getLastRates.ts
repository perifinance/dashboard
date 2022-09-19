import pynths from "configure/coins/pynths";
import { lastRate } from "../queries";
import { get } from "../service";
import dexNetworkId from "configure/network/dexNetworkId";

export const getLastRates = () => {
	const promise = [];

	pynths[dexNetworkId.toString()].forEach((pynth) => {
		const currencyName = pynth.symbol;
		promise.push(get(lastRate({ networkId: dexNetworkId, currencyName })));
	});

	return Promise.all(promise).then((rates) => {
		let keys = {};
		rates.forEach((e) => {
			keys[e.currencyName] = e.price;
		});
		return keys;
	});
};
