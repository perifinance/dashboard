import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "reducers";

import Card from "components/Card";
import Title from "components/Title";
import Progress from "components/Progress";
import pynthsCategories from "configure/coins/categories";
import pynths from "configure/coins/pynths";
import dexNetworkId from "configure/network/dexNetworkId";
import { getExchangeCount } from "lib/thegraph/api";
import { formatShortenCurrency, formatNumberToPer, formatCurrency } from "lib/format";

const Categories = ({ togglePUSD }) => {
	const { dexIsReady } = useSelector((state: RootState) => state.app);
	const { totalSupplies } = useSelector((state: RootState) => state.totalSupplyPynths);
	const { exchangeVolumes } = useSelector((state: RootState) => state.exchangeVolumes);
	const exchangeRates = useSelector((state: RootState) => state.exchangeRates);

	const [categoryByTotalSupplies, setCategoryByTotalSupplies] = useState({});
	const [totalSupply, setTotalSupply] = useState(0n);
	const [totalVolume, setTotalVolume] = useState(0n);
	const [exchangeCount, setExchangeCount] = useState(0);

	const getTotalSuppliesAddCatagory = () => {
		return totalSupplies.map((e) => {
			const pynth = pynths[dexNetworkId].find((pynth) => pynth.symbol === e.pynthName);
			return {
				...e,
				category: pynth ? pynth.categories : [],
			};
		});
	};

	const getCategoryByTotalSupply = () => {
		let total = 0n;
		const totalSuppliesAddCatagory = getTotalSuppliesAddCatagory();
		let categoryByTotalSupply = {};

		// console.log(totalSuppliesAddCatagory);
		// console.log(exchangeRates);

		totalSuppliesAddCatagory.forEach((item) => {
			if (item.pynthName !== "pUSD") {
				item.category.forEach((category) => {
					if (!categoryByTotalSupply[category]) {
						categoryByTotalSupply[category] = 0n;
					}
					let rate = exchangeRates[item.pynthName] ? exchangeRates[item.pynthName] : 1000000000000000000n;
					const pynthByTotalUSD = (item.totalSupply * rate) / 1000000000000000000n;
					categoryByTotalSupply[category] = categoryByTotalSupply[category] + pynthByTotalUSD;
					total += pynthByTotalUSD;
				});
			} else if (item.pynthName === "pUSD" && togglePUSD) {
				item.category.forEach((category) => {
					if (!categoryByTotalSupply[category]) {
						categoryByTotalSupply[category] = 0n;
					}
					let rate = exchangeRates[item.pynthName] ? 1000000000000000000n : exchangeRates[item.pynthName];
					const pynthByTotalUSD = (item.totalSupply * rate) / 1000000000000000000n;
					categoryByTotalSupply[category] = categoryByTotalSupply[category] + pynthByTotalUSD;
					total += pynthByTotalUSD;
				});
			}
		});
		setTotalSupply(total);
		return categoryByTotalSupply;
	};

	const getTotalVolume = () => {
		let total = 0n;
		exchangeVolumes.forEach((volume) => {
			if (volume[0].currencyName !== "pUSD") {
				const pynthsByVolume = volume.reduce((a, b) => {
					return a + b.usdVolume;
				}, 0n);
				total += pynthsByVolume;
			}
		});
		return total;
	};

	const init = async () => {
		const exchangeCount = await getExchangeCount();
		setCategoryByTotalSupplies(getCategoryByTotalSupply());
		setTotalVolume(getTotalVolume());
		setExchangeCount(exchangeCount);
	};

	useEffect(() => {
		if (dexIsReady) {
			init();
		}
	}, [dexIsReady, totalSupplies]);

	return (
		<Card>
			<div className="flex flex-col lg:flex-row gap-5 lg:justify-between">
				<div className="lg:w-2/5 lg:min-w-40">
					<Title>Categories</Title>
					<div className="flex flex-wrap mt-4">
						{pynthsCategories.map((e, i) => {
							if (["currencies", "crypto", "commodities", "indices"].includes(e)) {
								return (
									<Progress
										key={i}
										text={e.charAt(0).toUpperCase() + e.slice(1)}
										per={formatNumberToPer(categoryByTotalSupplies[e], totalSupply, 6)}
									></Progress>
								);
							} else {
								return <div key={i}></div>;
							}
						})}
					</div>
				</div>
				<div className="lg:w-1/2">
					<div className="flex flex-col mt-4 lg:mt-0">
						<Title>24H Exchange Overview</Title>
						<div className="flex flex-col mb-4">
							<div className="text-4xl font-medium">${formatCurrency(totalVolume, 2)}</div>
							<div className="text-sm font-normal text-gray-700">Total Trading Volume</div>
						</div>
						<div className="flex flex-col mb-4">
							<div className="text-2xl font-medium text-gray-700">{exchangeCount}</div>
							<div className="text-sm font-normal text-gray-700">Total Trades</div>
						</div>
						<div className="flex space-x-4">
							{/* <div className="flex flex-col">
                                    <div className="text-4xl font-medium">5.29%</div>
                                    <div className="text-sm font-normal text-gray-700">Debt Inflation</div>
                                </div> */}
							{/* <div className="flex flex-col justify-end">
                                    <div className="text-2xl font-medium text-gray-700">
                                        32
                                    </div>
                                    <div className="text-sm font-normal text-gray-700">
                                        Active Traders
                                    </div>
                                </div> */}
						</div>
					</div>
				</div>
			</div>
		</Card>
	);
};
export default Categories;
