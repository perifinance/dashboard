import { stableDebt } from "../queries";
import { get } from "../service";
import { getSupportedNetworks } from "configure/network";
export const getStableDebt = () => {
	let promise = [];
	getSupportedNetworks().forEach((networkId) => {
		promise.push(get(stableDebt({ networkId })));
	});

	return Promise.all(promise).then((debts) => {
		const datas = debts.reduce((a, b) => {
			return a.concat(b);
		});

		let value = {};
		let total = {
			USDC: 0n,
			DAI: 0n,
		};

		datas.forEach((item) => {
			if (!value[item.networkId]) {
				value[item.networkId] = {};
			}

			value[item.networkId][item.id] = item.amount;
			if (total[item.id]) {
				total[item.id] += item.amount;
			} else {
				total[item.id] = item.amount;
			}
		});

		return {
			total,
			...value,
		};
	});
};
