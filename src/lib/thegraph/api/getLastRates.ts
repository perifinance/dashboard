import pynths from "configure/coins/pynths";
import dexNetworkId from "configure/network/dexNetworkId";

import { lastRate } from "../queries";
import { get } from "../service";

export const getLastRates = () => {
	const promise = [];
	
	pynths[dexNetworkId.toString()].forEach((pynth) => {
		const currencyKeys = pynth.name;
		promise.push(get(lastRate({ networkId: dexNetworkId, currencyKeys })));
	});

	return Promise.all(promise).then((rates) => {
		let keys = {};
		rates.forEach((e) => {
			keys[e.currencyKeys] = e.price;
		});
		return keys;
	});
};
