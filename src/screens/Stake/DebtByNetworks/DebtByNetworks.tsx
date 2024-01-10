import { useEffect, useState } from "react";
import Card from "components/Card";
import Title from "components/Title";
import PieChart from "components/PieChart";
import { useSelector } from "react-redux";
import { RootState } from "reducers";
import ColorVerticalLabel from "components/ColorVerticalLabel";
import AreaChart from "components/AreaChart";
import { getSupportedNetworks, SUPPORTED_NETWORKS } from "configure/network";
import { formatShortenCurrency, formatNumberToPer } from "lib/format";
import { getColors } from "lib";
import { utils } from "ethers";
const colors = ["bg-blue-500", "bg-orange-500", "bg-pink-700", "bg-blue-700"];

const DebtByNetworks = () => {
	const { stakeIsReady } = useSelector((state: RootState) => state.app);
	const networkCachedDebts = useSelector((state: RootState) => state.networkCachedDebts);
	const { networkByDebtCashes } = useSelector((state: RootState) => state.networkByDebtCashes);
	const [networkDebts, setNetworkDebts] = useState([]);
	const [totalDebts, setTotalDebts] = useState(0);

	const init = () => {
		let total = 0n;
		const networkDebts = getSupportedNetworks().map((e, index) => {
			total = total + networkCachedDebts[e.toString()].total;

			return {
				networkId: e,
				color: colors[index],
				networkName: SUPPORTED_NETWORKS[e.toString()],
				totalDebt: networkCachedDebts[e.toString()].total,
				per: formatNumberToPer(networkCachedDebts[e.toString()].total, networkCachedDebts.total.total),
			};
		});

		// console.log(networkByDebtCashes);

		setTotalDebts(Number(utils.formatEther(total / BigInt(4))));
		setNetworkDebts(networkDebts.sort((a, b) => Number(b.totalDebt) - Number(a.totalDebt)));
	};

	useEffect(() => {
		if (stakeIsReady) {
			init();
		}
	}, [stakeIsReady]);

	return (
		<Card>
			<Title>Debt by Networks</Title>
			<div className="flex flex-col lg:flex-row lg:justify-between">
				<div className="flex justify-between mx-4 ss:mx-2 mb-4 sm:mb-0">
					<div className="flex lg:mb-4 items-center justify-center ">
						<div className="w-40 lg:w-52 h-40 lg:h-52">
							<PieChart x={"networkName"} y={"per"} data={networkDebts} colors={getColors(networkDebts)}></PieChart>
						</div>
						<div className=" absolute space-y-1 self-center justify-center">
							<div className="text-sm xs:text-lg lg:text-2xl text-gray-500 font-medium">{formatShortenCurrency(totalDebts)}</div>
							<div className="text-[10px] ss:text-xs text-gray-700 text-center font-normal">Total Debt</div>
						</div>
					</div>
					<div className="flex flex-col mb-4 lg:mb-0 lg:hidden flex-nowrap lg:gap-2">
						{networkDebts.map((networkDebt) => {
							return (
								<ColorVerticalLabel
									color={networkDebt.color}
									text={networkDebt.networkName}
									per={networkDebt.per}
									key={networkDebt.networkName}
								></ColorVerticalLabel>
							);
						})}
					</div>
				</div>

				<div className="w-[95%] mx-auto h-32 lg:h-52 lg:self-end lg:pb-3 lg:pl-10 text-[10px]">
					<AreaChart data={networkByDebtCashes} colors={colors}></AreaChart>
				</div>
			</div>

			<div className="hidden lg:flex space-y-2 lg:gap-2">
				{networkDebts.map((networkDebt) => {
					return (
						<ColorVerticalLabel
							color={networkDebt.color}
							text={networkDebt.networkName}
							per={networkDebt.per}
							key={networkDebt.networkName}
						></ColorVerticalLabel>
					);
				})}
			</div>
		</Card>
	);
};
export default DebtByNetworks;
