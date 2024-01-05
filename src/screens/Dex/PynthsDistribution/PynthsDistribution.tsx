import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "reducers";
import { utils } from "ethers";
import { formatShortenCurrency, formatNumberToPer } from "lib/format";

import { getSupportedNetworks, SUPPORTED_NETWORKS } from "configure/network";

import Card from "components/Card";
import Title from "components/Title";
import PieChart from "components/PieChart";
import ColorVerticalLabel from "components/ColorVerticalLabel";

const colors = ["bg-blue-500", "bg-pink-500", "bg-green-500", "bg-pink-700", "bg-blue-700", "bg-orange-500"];
// const assets = ['PERI', 'USDC', 'DAI'];

const PynthsDistribution = () => {
	const { dexIsReady } = useSelector((state: RootState) => state.app);
	const { totalSupplies } = useSelector((state: RootState) => state.totalSupplyPynths);

	const exchangeRates = useSelector((state: RootState) => state.exchangeRates);

	const [totalDebtUSDValue, setTotalDebtUSDValue] = useState(0n);
	const [networkByDebts, setNetworkByDebts] = useState([]);
	const getNetworkByDebts = () => {
		let total = 0n;
		const networkByDebts = getSupportedNetworks().map((networkId) => {
			const networkByDebt = totalSupplies.reduce((a, b) => {
				let rate = exchangeRates[b.pynthName] === undefined ? 1000000000000000000n : exchangeRates[b.pynthName];
				return b.networkId === networkId ? a + (b.totalSupply * rate) / 1000000000000000000n : a;
			}, 0n);

			total = total + networkByDebt;

			return {
				networkId,
				networkByDebt,
			};
		});
		setTotalDebtUSDValue(total);
		return networkByDebts;
	};

	const init = () => {
		let pynthsByTotalSupplies = getNetworkByDebts().sort((a, b) => Number(b.networkByDebt) - Number(a.networkByDebt));
		setNetworkByDebts(pynthsByTotalSupplies);
	};

	useEffect(() => {
		if (dexIsReady) {
			init();
		}
	}, [dexIsReady, totalSupplies]);

	return (
		<Card>
			<Title>Pynths Distribution by Network</Title>
			<div className="flex lg:flex-row flex-col lg:justify-between lg:h-[80%]">
				<div className="flex lg:flex-col gap-5 lg:gap-2">
					<div className="w-40 lg:w-44 h-40 lg:h-44 my-auto">
						<PieChart
							x={"networkId"}
							y={"networkByDebt"}
							data={networkByDebts}
							colors={colors}
							total={totalDebtUSDValue}
						></PieChart>
					</div>
					<div className="lex lg:flex-col self-center justify-center items-end lg:items-center w-40 lg:w-52">
						<div className="flex flex-col gap-2 lg:gap-1 items-end lg:items-center">
							<div className="text-2xl text-gray-500 font-medium leading-none">
								${formatShortenCurrency(Number(utils.formatEther(totalDebtUSDValue)))}
							</div>
							<div className="text-sm text-gray-700 font-normal">USD Value</div>
						</div>
					</div>
				</div>
				<div className="flex lg:flex-col space-x-1 lg:space-y-1 lg:space-x-0 lg:w-[25%] lg:justify-center">
					{networkByDebts.map((e, i) => (
						<ColorVerticalLabel
							key={i}
							color={colors[i]}
							text={SUPPORTED_NETWORKS[e.networkId]}
							size="sm"
							per={formatNumberToPer(e.networkByDebt, totalDebtUSDValue)}
						></ColorVerticalLabel>
					))}
				</div>
				{/* <div className="hidden lg:flex flex-wrap lg:flex-nowrap flex-col space-y-3">
					{networkByDebts.map((e, i) => (
						<ColorVerticalLabel
							size="sm"
							key={i}
							color={colors[i]}
							text={SUPPORTED_NETWORKS[e.networkId]}
							per={formatNumberToPer(e.networkByDebt, totalDebtUSDValue)}
						></ColorVerticalLabel>
					))}
				</div> */}
			</div>
		</Card>
	);
};
export default PynthsDistribution;
