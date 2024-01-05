import pynths from "configure/coins/pynths";
import dexNetworkId from "configure/network/dexNetworkId";

import { lastRate } from "../queries";
import { get } from "../service";

export const getLastRates = () => {
	const currencyKeys = [];
	
	pynths[dexNetworkId.toString()].forEach((pynth) => {
		currencyKeys.push(pynth.symbol);
	});

	return get(lastRate({ networkId: dexNetworkId, currencyKeys })).then((data) => {
		let keys = {};
		keys["pUSD"] = 10n ** 18n;
		data.forEach((e) => {
			keys[`p${e.currencyKey}`] = e.price;
		});
		return keys;
	});


	// return Promise.all(promise).then((rates) => {
	// 	let keys = {};
	// 	rates.forEach((e) => {
	// 		keys[e.currencyKeys] = e.price;
	// 	});
	// 	return keys;
	// });
};
