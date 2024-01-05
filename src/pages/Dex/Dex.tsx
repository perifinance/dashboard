import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "reducers";
import Categories from "screens/Dex/Categories";
import PynthsTotalVolume from "screens/Dex/PynthsTotalVolume";
import Performance from "screens/Dex/Performance";
import PynthsDistribution from "screens/Dex/PynthsDistribution";
import TradingVolume from "screens/Dex/TradingVolume";

import { setDexIsReady, setClear, setLoading } from "reducers/app";
import { setTotalSupplyPynths } from "reducers/totalSupplyPynths";
import { setExchangeVolumes } from "reducers/exchangeVolumes";
import { setRateChanges } from "reducers/rateChanges";
import { setExchangeRates } from "reducers/exchangeRates";

import { getTotalSupplyPynths } from "lib/thegraph/api";
import { getExchangeVolumes } from "lib/thegraph/api";
import { getLastRates } from "lib/thegraph/api";
import { getRateChanges } from "lib/thegraph/api";

const Dex = () => {
	const dispatch = useDispatch();

	const { dexIsReady } = useSelector((state: RootState) => state.app);
	const [togglePUSD, setTogglePUSD] = useState(false);

	const init = async () => {
		dispatch(setLoading(true));
		const totalSupplyPynths = await getTotalSupplyPynths();
		const exchangeVolumes = await getExchangeVolumes();
		const exchangeRates = await getLastRates();
		console.log("exchangeRates", exchangeRates);
		const rateChanges = await getRateChanges();

		dispatch(setExchangeRates(exchangeRates));
		dispatch(setTotalSupplyPynths(totalSupplyPynths));
		dispatch(setExchangeVolumes(exchangeVolumes));
		dispatch(setRateChanges(rateChanges));
		dispatch(setDexIsReady());
		dispatch(setLoading(false));
	};

	const togglePUSDHandler = async (toggle: boolean) => {
		dispatch(setLoading(true));
		setTogglePUSD(toggle);
		await init();
		dispatch(setLoading(false));
	};

	useEffect(() => {
		if (!dexIsReady) {
			init();
		}
	}, [dexIsReady]);

	return (
		<div className="flex flex-col w-[92%] lg:w-full lg:flex-row lg:px-0 gap-5 lg:h-144 flex-wrap">
			<div className="w-full lg:flex-1">
				<PynthsTotalVolume togglePUSDHandler={togglePUSDHandler} togglePUSD={togglePUSD}/>
			</div>
			<div className="w-full lg:flex-1">
				<TradingVolume togglePUSD={togglePUSD} />
			</div>
			<div className="w-full lg:flex-1">
				<PynthsDistribution />
			</div>
			<div className="lg:w-3/5 lg:h-80 lg:flex-1">
				<Categories togglePUSD={togglePUSD} />
			</div>
			<div className="lg:w-2/5 lg:h-80 lg:flex-1">
				<Performance />
			</div>
		</div>
	);
};
export default Dex;
