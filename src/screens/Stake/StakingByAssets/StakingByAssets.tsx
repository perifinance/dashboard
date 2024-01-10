import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "reducers";

import Card from "components/Card";
import Title from "components/Title";
import PieChart from "components/PieChart";
import ColorVerticalLabel from "components/ColorVerticalLabel";
import { formatShortenCurrency, formatNumberToPer } from "lib/format";
import { utils } from "ethers";
import { set } from "date-fns";

const colors = ["bg-blue-500", "bg-orange-500", "bg-green-500"];

const StakingByAssets = () => {
	const { stakeIsReady } = useSelector((state: RootState) => state.app);
	const networkCachedDebts = useSelector((state: RootState) => state.networkCachedDebts);
	const [TVL, setTVL] = useState("0");
	const [periTVL, setPeriTVL] = useState("0");
	const [stableTVL, setStableTVL] = useState("0");
	const [perTVL, setPerTVL] = useState([]);
	const periRates: any = useSelector((state: RootState) => state.periRates);

	const getPers = () => {
		const coins = ["PERI", "USDC", "DAI"];

		let total = networkCachedDebts.total.total;
		// let coinAmount = networkCachedDebts.total["PERI"];

		// total -= coinAmount;
		// coinAmount = BigInt(coinAmount) * periRates.price / 10n**18n;
		// total += coinAmount;
		return coins
			.map((e, index) => {
				let coinAmount = networkCachedDebts.total[e];
				if (e === "PERI")
					coinAmount = BigInt(coinAmount)/*  * periRates.price / 10n**18n */;

				return {
					coin: e,
					color: colors[index],
					per: formatNumberToPer(coinAmount, total),
				};
			})
			.sort((a, b) => {
				if (a.per < b.per) {
					return 1;
				}
				if (a.per > b.per) {
					return -1;
				}
				// a must be equal to b
				return 0;
			});
	};
	useEffect(() => {
		if (stakeIsReady) {
			setTVL(formatShortenCurrency(Number(utils.formatEther(networkCachedDebts.total.total.toString()))));
			setPeriTVL(formatShortenCurrency(Number(utils.formatEther(networkCachedDebts.total.PERI.toString()))));
			setStableTVL(formatShortenCurrency(Number(utils.formatEther(networkCachedDebts.total.stable.toString()))));
			setPerTVL(getPers());
		}
	}, [stakeIsReady]);

	return (
		<Card>
			<Title>Staking by Assets</Title>
			<div className="flex flex-col md:gap-14 lg:gap-0">
				<div className=" flex justify-between lg:space-x-5 my-4 mx-0 xs:mx-4 ss:mx-0">
					<div className="relative w-40 lg:w-52 h-40 lg:h-52">
						<PieChart x={"coin"} y={"per"} data={perTVL} colors={colors}></PieChart>
						<div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
							<div className="text- lg:text-lg text-gray-500 font-medium text-center">${TVL}</div>
							<div className="hidden lg:block text-xs text-gray-700 font-light">Total Value Locked</div>
							<div className="lg:hidden text-xs text-gray-700 font-light text-center">TVL</div>
						</div>
					</div>
					<div className="space-y-3 lg:space-y-5 self-center w-fit md:pl-3 md:flex-1">
						<div className="w-fit">
							<div className="text-2xl lg:text-4xl text-gray-500 font-medium">${periTVL}</div>
							<div className="hidden ss:block text-sm text-gray-700 font-light">PERI Value Locked</div>
							<div className="ss:hidden text-sm text-gray-700 font-light">PERI TVL</div>
						</div>
						<div className="w-fit">
							<div className="text-2xl lg:text-3xl text-gray-500 font-medium">${stableTVL}</div>
							<div className="hidden ss:block text-sm text-gray-700 font-light">Stable Value Locked</div>
							<div className="ss:hidden text-sm text-gray-700 font-light">Stable TVL</div>
						</div>
					</div>
					
				</div>
				<div className="flex self-start md:gap-2 lg:gap-0 ">
					{perTVL.map((e, i) => {
						return <ColorVerticalLabel color={colors[i]} text={e.coin} per={e.per} key={i}></ColorVerticalLabel>;
					})}
				</div>
			</div>
		</Card>
	);
};
export default StakingByAssets;
