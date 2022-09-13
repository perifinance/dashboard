import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "reducers";
import { setStakeIsReady, setClear } from "reducers/app";
import { setNetworkCachedDebts } from "reducers/networkCachedDebts";
import { setAPY } from "reducers/APY";
import { setPeriChartRates } from "reducers/periChartRates";
import { setCirculatingSupply } from "reducers/circulatingSupply";
import { setNetworkByDebtCashes } from "reducers/networkByDebtCashes";
import { setPeriholderCounts } from "reducers/periholderCounts";
import { setExchangeRates } from "reducers/exchangeRates";
import { setPeriRates } from "reducers/periRates";
import {
	getStableDebt,
	getChartRates,
	getDebtCaches,
	getPeriholderCounts,
	getLastRates,
	getLastPeriRates,
} from "lib/thegraph/api";
import { getCachedDebts, getTotalAPY, getTotalCirculatingSupply } from "lib/api/api";

import StakingByAssets from "screens/Stake/StakingByAssets";
import DebtByNetworks from "screens/Stake/DebtByNetworks";
import Overview from "screens/Stake/Overview";
import Information from "screens/Stake/Information";
import Holders from "screens/Stake/Holders";

const Stake = () => {
	const dispatch = useDispatch();

	const { stakeIsReady } = useSelector((state: RootState) => state.app);

	const getPERIandStalbeDebt = (value) => {
		let stable = 0n;
		Object.keys(value).forEach((e) => {
			if (e !== "total") {
				stable = stable + value[e];
			}
		});
		return {
			stable,
			PERI: value["total"] - stable,
			...value,
		};
	};

	const getDebts = async () => {
		const promise = [getCachedDebts(), getStableDebt()];

		const debts = Promise.all(promise).then((data) => {
			const value = {};

			Object.keys(data[0]).forEach((e) => {
				value[e] = getPERIandStalbeDebt(Object.assign(data[0][e], data[1][e]));
			});

			return value;
		});

		return debts;
	};

	const init = async () => {
		console.time("init");
		try {
			const [
				debt,
				apy,
				// chartRate, // ! 에러 원인
				circulatingSupply,
				networkByDebtCashes,
				periholderCounts,
				exchangeRates,
				// periRates, // ! 에러 원인
			] = await Promise.all([
				getDebts(),
				getTotalAPY(),
				// getChartRates({
				// 	currencyName: "PERI",
				// 	// networkId: process.env.REACT_APP_ENV === "production" ? 137 : 80001,
				// 	networkId: 137,
				// }),
				getTotalCirculatingSupply(),
				getDebtCaches(),
				getPeriholderCounts(),
				getLastRates(),
				// getLastPeriRates(),
			]);
			console.timeEnd("init");

			dispatch(setNetworkCachedDebts(debt));
			dispatch(setAPY(apy));
			// dispatch(setPeriChartRates(chartRate));
			dispatch(setCirculatingSupply(circulatingSupply));
			dispatch(setNetworkByDebtCashes(networkByDebtCashes));
			dispatch(setPeriholderCounts(periholderCounts));
			dispatch(setExchangeRates(exchangeRates));
			// dispatch(setPeriRates(periRates));
		} catch (err) {
			console.error("init error:", err);
		} finally {
			dispatch(setStakeIsReady());
		}
	};

	useEffect(() => {
		console.log("ready test", stakeIsReady);
		if (!stakeIsReady) {
			init();
		}
	}, [stakeIsReady]);

	return (
		<div className="flex flex-col px-4 lg:px-0 gap-5">
			<div className="flex flex-col lg:flex-row gap-5">
				<div className="lg:h-86">{/* <StakingByAssets></StakingByAssets> */}</div>
				<div className="lg:h-86 lg:flex-1">
					<DebtByNetworks></DebtByNetworks>
				</div>
			</div>
			<div className="flex flex-col lg:flex-row gap-5">
				<div className="lg:h-60 flex-1">
					<Overview></Overview>
				</div>
				<div className="lg:h-60">
					<Information></Information>
				</div>
				<div className="lg:h-60">
					<Holders></Holders>
				</div>
			</div>
		</div>
	);
};
export default Stake;
