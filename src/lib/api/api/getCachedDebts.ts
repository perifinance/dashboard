import { get } from "../service";
import { getCachedDebt } from "../queries";
import { getSupportedNetworks } from "configure/network";
export const getCachedDebts = async () => {
	const promise = [];

	await getSupportedNetworks().forEach((networkId) => {
		promise.push(get(getCachedDebt({ networkId })));
	});

	return await Promise.all(promise).then((item) => {
		let totalDebt = 0n;
		let debtInfo = {};

		item.forEach((e) => {
			if (!debtInfo[e.networkId]) {
				debtInfo[e.networkId] = {};
			}
			debtInfo[e.networkId]["total"] = e.debt;
			totalDebt = totalDebt + e.debt;
		});

		console.log("cached debts", item, {
			total: {
				total: totalDebt,
			},
			...debtInfo,
		});

		return {
			total: {
				total: totalDebt,
			},
			...debtInfo,
		};
	});
};
