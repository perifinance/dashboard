import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "reducers";

import Card from "components/Card";
import Title from "components/Title";
import PieChart from "components/PieChart";
import ColorVerticalLabel from "components/ColorVerticalLabel";
import pynths from "configure/coins/pynths";
import { formatShortenCurrency, formatNumberToPer } from "lib/format";
import dexNetworkId from "configure/network/dexNetworkId";
import { utils } from "ethers";

const colors = ["bg-blue-500", "bg-pink-500", "bg-green-500", "bg-pink-700", "bg-blue-700", "bg-orange-500"];

const PynthsTotalVolume = ({ togglePUSDHandler }) => {
	const { dexIsReady } = useSelector((state: RootState) => state.app);
	const { totalSupplies } = useSelector((state: RootState) => state.totalSupplyPynths);

	const exchangeRates = useSelector((state: RootState) => state.exchangeRates);

	const [totalUSDValue, setTotalUSDValue] = useState(0n);
	const [totalVolume, setTotalVolume] = useState(0n);

	const [sortByTotalSupplies, setSortByTotalSupplies] = useState([]);
	const [togglePUSD, setTogglePUSD] = useState(false);

	const getPynthsByTotalSupplies = () => {
		let total = 0n;
		let pynthsByTotalSupplies = pynths[dexNetworkId].map((pynth) => {
			if (pynth.symbol !== "pUSD") {
				const pynthByTotalUSD = totalSupplies.reduce((a, b) => {
					let rate = exchangeRates[pynth.symbol] === undefined ? 1000000000000000000n : exchangeRates[pynth.symbol];
					return b.pynthName === pynth.symbol ? a + (b.totalSupply * rate) / 1000000000000000000n : a;
				}, 0n);
				total = total + pynthByTotalUSD;

				return {
					pynthName: pynth.symbol,
					totalSupplyToUSD: pynthByTotalUSD,
					totalSupply: utils.formatEther(pynthByTotalUSD),
				};
			} else if (pynth.symbol === "pUSD" && togglePUSD) {
				const pynthByTotalUSD = totalSupplies.reduce((a, b) => {
					let rate = exchangeRates[pynth.symbol] === undefined ? 1000000000000000000n : exchangeRates[pynth.symbol];
					return b.pynthName === pynth.symbol ? a + (b.totalSupply * rate) / 1000000000000000000n : a;
				}, 0n);
				total = total + pynthByTotalUSD;

				return {
					pynthName: pynth.symbol,
					totalSupplyToUSD: pynthByTotalUSD,
					totalSupply: utils.formatEther(pynthByTotalUSD),
				};
			} else {
				return {
					pynthName: pynth.symbol,
					totalSupplyToUSD: 0n,
					totalSupply: 0n,
				};
			}
		});

		setTotalUSDValue(total);
		return pynthsByTotalSupplies.sort((a, b) => Number(b.totalSupplyToUSD - a.totalSupplyToUSD));
	};

	const getEtc = (pynthsByTotalSupplies) => {
		if (pynthsByTotalSupplies.length > 5) {
			const totalSupplyToUSD = pynthsByTotalSupplies.splice(5).reduce((a, b) => {
				return a + b.totalSupplyToUSD;
			}, 0n);
			let etc = [
				{
					pynthName: "etc",
					totalSupplyToUSD,
					totalSupply: utils.formatEther(totalSupplyToUSD),
				},
			];

			return pynthsByTotalSupplies.splice(0, 5).concat(etc);
		} else {
			return pynthsByTotalSupplies;
		}
	};

	const init = () => {
		let pynthsByTotalSupplies = getPynthsByTotalSupplies();

		setSortByTotalSupplies(getEtc(pynthsByTotalSupplies));
	};

	const onToggleHandler = (toggle: boolean) => {
		setTogglePUSD(toggle);
		togglePUSDHandler(toggle);
	};

	useEffect(() => {
		if (dexIsReady) {
			init();
		}
	}, [dexIsReady, totalSupplies]);

	return (
		<Card>
			<div className="flex justify-between items-start w-full">
				<Title>Pynths Total Volume</Title>
				<button
					className={`mb-5 text-lg font-medium ${togglePUSD ? "text-gray-500" : "text-gray-700"} hover:text-gray-300`}
					onClick={() => onToggleHandler(!togglePUSD)}
				>
					add pUSD
				</button>
			</div>
			<div className="flex space-x-5 my-4">
				<div className="w-40 lg:w-44 h-40 lg:h-44">
					<PieChart
						x={"pynthName"}
						y={"totalSupplyToUSD"}
						data={sortByTotalSupplies}
						colors={colors}
						total={totalUSDValue}
					></PieChart>
				</div>

				<div className="flex lg:flex-col self-center w-52 flex-1">
					<div className="flex flex-col lg:flex-row gap-2 items-end pl-2">
						<div className="text-2xl text-gray-500 font-medium">
							${formatShortenCurrency(Number(utils.formatEther(totalUSDValue * 10n ** 10n)))}
						</div>
						<div className="text-sm text-gray-700 font-normal">Total Pynths Value(USD)</div>
					</div>
					<div className="hidden lg:flex flex-wrap space-y-2">
						{sortByTotalSupplies.map((e, i) => (
							<ColorVerticalLabel
								key={i}
								color={colors[i]}
								text={e.pynthName}
								per={formatNumberToPer(e.totalSupplyToUSD, totalUSDValue)}
							></ColorVerticalLabel>
						))}
					</div>
				</div>
			</div>
			<div className="flex flex-wrap space-y-2 lg:hidden">
				{sortByTotalSupplies.map((e, i) => (
					<ColorVerticalLabel
						key={i}
						color={colors[i]}
						text={e.pynthName}
						per={formatNumberToPer(e.totalSupplyToUSD, totalUSDValue)}
					></ColorVerticalLabel>
				))}
			</div>
		</Card>
	);
};
export default PynthsTotalVolume;
