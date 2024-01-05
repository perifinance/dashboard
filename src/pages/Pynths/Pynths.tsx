import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "reducers";

import PynthsCategory from "screens/Pynths/PynthsCategory";
import PynthsCard from "screens/Pynths/PynthsCard";
import pynths from "configure/coins/pynths";
import dexNetworkId from "configure/network/dexNetworkId";

import { setPynthsIsReady, setClear, setLoading } from "reducers/app";
import { setTotalSupplyPynths } from "reducers/totalSupplyPynths";
import { setExchangeRates } from "reducers/exchangeRates";

import { getTotalSupplyPynths } from "lib/thegraph/api";
import { getLastRates } from "lib/thegraph/api";

const Pynths = () => {
	const dispatch = useDispatch();
	const { pynthsIsReady } = useSelector((state: RootState) => state.app);
	const [isActive, setIsActive] = useState("all");
	const { totalSupplies } = useSelector((state: RootState) => state.totalSupplyPynths);
	const exchangeRates = useSelector((state: RootState) => state.exchangeRates);
	const [pynthsByTotalSupplies, setPynthsByTotalSupplies] = useState([]);

	const getPynthsByTotalSupplies = () => {
		let pynthsByTotalSupplies = pynths[dexNetworkId].map((pynth) => {
			const pynthByTotalUSD = totalSupplies.reduce((a, b) => {
				let rate = exchangeRates[pynth.symbol] === undefined ? 1000000000000000000n : exchangeRates[pynth.symbol];
				return b.pynthName === pynth.symbol ? a + (b.totalSupply * rate) / 1000000000000000000n : a;
			}, 0n);

			const pynthByTotal = totalSupplies.reduce((a, b) => {
				return b.pynthName === pynth.symbol ? a + b.totalSupply : a;
			}, 0n);

			return {
				...pynth,
				totalSupply: pynthByTotal,
				totalSupplyToUSD: pynthByTotalUSD,
				rate: exchangeRates[pynth.symbol],
			};
		});

		return pynthsByTotalSupplies.sort((a, b) => Number(b.totalSupplyToUSD - a.totalSupplyToUSD));
	};

	const init = async () => {
		dispatch(setLoading(true));
		const totalSupplyPynths = await getTotalSupplyPynths();
		const exchangeRates = await getLastRates();

		dispatch(setExchangeRates(exchangeRates));
		dispatch(setTotalSupplyPynths(totalSupplyPynths));
		dispatch(setPynthsIsReady());
		dispatch(setLoading(false));
	};

	const appInit = () => {
		dispatch(setLoading(true));
		setPynthsByTotalSupplies(getPynthsByTotalSupplies());
		dispatch(setLoading(false));
	};

	useEffect(() => {
		if (pynthsIsReady) {
			appInit();
		} else {
			init();
		}
	}, [pynthsIsReady]);

	return (
		<div className="w-full">
			<PynthsCategory isActive={isActive} setIsActive={setIsActive}></PynthsCategory>

			<div className="flex flex-col lg:flex-row lg:flex-wrap px-4 lg:px-0 gap-5">
				{pynthsByTotalSupplies.map((item) => {
					if (isActive === "all" || item.categories.includes(isActive)) {
						return (
							<div className="w-full lg:w-100 h-45 lg:h-28" key={item.id}>
								<PynthsCard pynths={item}></PynthsCard>
							</div>
						);
					} else {
						return <></>;
					}
				})}
			</div>
		</div>
	);
};
export default Pynths;
