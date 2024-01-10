import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "reducers";
import { utils } from "ethers";
import { formatShortenCurrency, formatNumberToPer } from "lib/format";
import pynths from "configure/coins/pynths";
import dexNetworkId from "configure/network/dexNetworkId";
import Card from "components/Card";
import Title from "components/Title";
import "./scroll.css";

const Performance = () => {
	const { dexIsReady } = useSelector((state: RootState) => state.app);
	const { exchangeVolumes } = useSelector((state: RootState) => state.exchangeVolumes);
	const { rateChanges } = useSelector((state: RootState) => state.rateChanges);
	const exchangeRates = useSelector((state: RootState) => state.exchangeRates);
	const [pynthsByVolumes, setPynthsByVolumes] = useState([]);

	const getPynthsByVolumes = () => {
		const pynthsByVolumes = exchangeVolumes.map((volume) => {
			const pynthsByVolume = volume.reduce((a, b) => {
				return a + b.usdVolume;
			}, 0n);
			return {
				...volume[0],
				...pynths[dexNetworkId].find((e) => volume[0].currencyName === e.symbol),
				usdVolume: pynthsByVolume,
			};
		});
		return pynthsByVolumes.sort((a, b) => Number(b.usdVolume - a.usdVolume));
	};

	const init = () => {
		// console.log(exchangeRates);

		let pynthsByTotalSupplies = getPynthsByVolumes();
		setPynthsByVolumes(pynthsByTotalSupplies);
	};

	useEffect(() => {
		if (dexIsReady) {
			init();
		}
	}, [dexIsReady, exchangeVolumes]);

	return (
		<Card>
			<div className="inline-block w-full">
				<Title>Performance</Title>
			</div>
			<div className="h-full w-full lg:h-[84%] overflow-y-scroll ">
				<table className="w-full text-xs text-gray-700 border-b border-gray-900">
					<thead className="text-xs sm:text-sm border-t border-b border-gray-900 w-full">
						<tr className="h-9 my-auto">
							<th className="px-4 py-1 font-normal border-r border-gray-900">Tokens</th>
							<th className="px-4 py-1 font-normal ">Price (pUSD)</th>
							<th className="px-4 py-1 font-normal ">24H Change</th>
							<th className="px-4 py-1 font-normal">24H Volume</th>
						</tr>
					</thead>
					<tbody className="text-xs md:text-sm lg:text-base font-normal w-full ">
						{pynthsByVolumes.map(
							(e, i) =>
								e.symbol !== "pUSD" && (
									<tr key={i} className=" w-full selection:">
										<td className="p-2 border-r border-gray-900">
											<div className="flex flex-col sm:flex-row lg:gap-2 leading-5 lg:leading-6">
												<img
													className="inline-block w-5 h-5 self-center align-middle"
													src={`/images/currencies/${e.symbol === "pINCH" ? "p1INCH" : e.symbol}.svg`}
													alt={e.symbol}
												></img>
												<span className="inline-block text-xs xs:text-sm align-middle text-center lg:text-base ss:min-w-[56px] mx-auto sm:mx-0 text-gray-500 font-medium lg:font-bold">
													{e.symbol === "pINCH" ? "p1INCH" : e.symbol}
												</span>
												<span className="hidden align-middle ss:inline-block text-[11px] sm:text-sm mx-auto sm:mx-0">{e.name}</span>
												
											</div>
										</td>
										<td className="p-2 text-right ">
											$
											{formatShortenCurrency(
												utils.formatEther(exchangeRates[e.symbol] === undefined ? 1000000000000000000n : exchangeRates[e.symbol])
											)}
										</td>
										<td
											className={`p-2 text-center ${
												Number(rateChanges[e.symbol]) !== 0 ? Number(rateChanges[e.symbol]) > 0 ? "text-blue-500" : "text-red-800" : ""
											}`}
										>
											{Number(rateChanges[e.symbol]) !== 0 ? Number(rateChanges[e.symbol]) > 0 ? "▲" : "▼" : ""} {rateChanges[e.symbol]}%
										</td>
										<td className="p-2 text-right selection:">${formatShortenCurrency(utils.formatEther(e.usdVolume))}</td>
									</tr>
								)
						)}
					</tbody>
				</table>
			</div>
		</Card>
	);
};
export default Performance;
