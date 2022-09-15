import { chartRate } from "../queries";
import { get } from "../service";
import { format } from "date-fns";
import { utils } from "ethers";
import { formatCurrency } from "lib";
import dexNetworkId from "configure/network/dexNetworkId";
import pynths from "configure/coins/pynths";

export const getRateChanges = async () => {
	const promise = [];
	let searchDate = (Number((new Date().getTime() / 1000).toFixed(0)) - 60 * 60 * 24).toString();
	const data = {};

	const setData = async (currencyName) => {
		const datas = await get(chartRate({ networkId: dexNetworkId, currencyName, searchDate }));
		console.log("datas", datas);
		if (datas.length > 0) {
			const lastPrice = Number(utils.formatEther(datas[datas.length - 1].price));
			const firstPrice = Number(utils.formatEther(datas[0].price));
			data[currencyName] = (((lastPrice - firstPrice) / firstPrice) * 100).toFixed(2);

			console.log("asdf", lastPrice, firstPrice);
		} else {
			data[currencyName] = "0.00";
		}
	};

	pynths[dexNetworkId.toString()].forEach((pynth) => {
		const currencyName = pynth.symbol;
		promise.push(setData(currencyName));
	});

	return Promise.all(promise).then(() => data);
};
