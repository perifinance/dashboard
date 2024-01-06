import { useEffect, useState } from "react";
import { useSelector, useStore } from "react-redux";
import { RootState } from "reducers";
import { formatCurrency, formatDecimal } from "lib/format";
import { ResponsiveContainer, AreaChart, Area, Tooltip, XAxis, YAxis } from "recharts";
import Card from "components/Card";
import Title from "components/Title";
import { utils } from "ethers";
import { hi } from "date-fns/locale";

const Overview = () => {
	const { stakeIsReady } = useSelector((state: RootState) => state.app);
	const { lastPrice, high24hr, low24hr, change } = useSelector((state: RootState) => state.periTicker);
	const { circulatingSupply } = useSelector((state: RootState) => state.circulatingSupply);

	
	const [marketCap, setMarketCap] = useState(0n);

	const getMarketCap = () => {
		let tmp = lastPrice * circulatingSupply;

		return tmp / 1000000000000000000n;
	};

	useEffect(() => {
		if (stakeIsReady && lastPrice > 0) {
			// console.log("high", high24hr);
			setMarketCap(getMarketCap());
		}
	}, [stakeIsReady, lastPrice]);

	return (
		<Card>
			<Title>24 Hours Overview</Title>
			<div className="flex flex-col mt-4">
				<div className="flex flex-row w-full justify-between">
					<div className="flex flex-col x-fit xs:w-1/3 mb-4">
						<div className="text-nowrap text-sm font-light text-gray-700 ml-1">Market Cap</div>
						<div className="text-xl font-medium text-blue-500 ">${formatCurrency(marketCap, 0)}</div>
					</div>

					<div className="flex flex-col w-fit lg:pl-5 items-start">
						<div className="text-nowrap text-sm font-light text-gray-700 ml-1">PERI Price</div>
						<div className="flex flex-row gap-5 items-end">
							<div className="flex flex-row items-end flex-nowrap text-xl font-medium text-blue-500">
								${formatCurrency(lastPrice, 4)}
								<span className={`text-[10px] ml-1 h-7 text-nowrap ${change ? change < 0 ? " text-red-600":" text-blue-500":"hidden"}`}>
									{change > 0 ? "▲" : "▼"} {Math.round(Number(utils.formatEther(change))*100)/100}%
								</span>
							</div>
						</div>
					</div>
				</div>
				<div className="flex flex-row w-full justify-between">
					<div className="flex flex-col x-fit lg:w-max mb-4">
						<div className="text-nowrap text-sm font-light text-gray-700 ml-1">24H High</div>
						<div className="text-lg font-semibold text-gray-700">${formatCurrency(high24hr, 4)}</div>
					</div>
					<div className="flex flex-col w-[120px] pr-3 items-start">
						<div className="w-16 text-nowrap text-sm font-light text-gray-700 ml-1">24H Low</div>
						<div className="text-lg font-semibold text-gray-700">${formatCurrency(low24hr, 4)}</div>
					</div>
				</div>
			</div>
			{/* <div className="w-full h-20 text-2xs lg:max-w-100">
				<ResponsiveContainer width="100%" height="100%" debounce={1} maxHeight={80}>
					<AreaChart data={rates} margin={{ top: 5, right: 0, left: 0, bottom: 20 }}>
						<defs>
							<linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
								<stop offset="5%" stopColor="#1D86FE" stopOpacity={0.8} />
								<stop offset="95%" stopColor="#1D86FE" stopOpacity={0} />
							</linearGradient>
						</defs>

						<XAxis dataKey="time" height={1} axisLine={false} tickLine={false} />
						<YAxis dataKey="price" domain={["dataMin", "dataMax"]} tickFormatter={(e) => e} hide={true} />

						{/* 라인 *//*}

						<Area type="monotone" dataKey="price" fillOpacity={1} stroke="#1D86FE" fill="url(#colorUv)" strokeWidth={3} />
					</AreaChart>
				</ResponsiveContainer>
			</div> */}
		</Card>
	);
};
export default Overview;
