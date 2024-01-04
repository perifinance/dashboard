import { useSelector } from "react-redux";
import { RootState } from "reducers";

import Card from "components/Card";
import Title from "components/Title";
import { formatCurrency } from "lib";

const Information = () => {
	const { APY } = useSelector((state: RootState) => state.APY);
	const initialReward = 76924719527063029689120;
	const inflationStart = 1625875200000;
	const decayStart = 52;
	const decayEnd = 172;
	const decayRate = 0.0125;

	function tokenDecaySupplyForWeek(counter) {
		let effectiveDecay = Math.pow(1 - decayRate, counter);
		let supplyForWeek = BigInt(initialReward * effectiveDecay);

		return supplyForWeek;
	}

	function getWeekCounter() {
		const now = new Date();
		const start = new Date(inflationStart);
		const weeks = (now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 7);
		return Math.floor(weeks);
	}

	function getWeeklyReward() {
		let currentWeek = getWeekCounter();

		if (currentWeek < decayStart) {
			return initialReward;
		} else if (currentWeek <= decayEnd) {
			let decayCount = currentWeek - (decayStart - 1);

			return tokenDecaySupplyForWeek(decayCount);
		} else {
			return 0n;
		}
	}
	const weeklyReward = formatCurrency(getWeeklyReward());

	return (
		<Card>
			<Title>PERI APY</Title>
			<div className="flex flex-col items-end lg:gap-5">
				<div className="flex flex-col w-24">
					<div className="text-2xl lg:text-4xl font-medium text-gray-500">{APY}%</div>
					<div className="text-nowrap text-sm font-light text-gray-700">Est. APY</div>
				</div>
				<div className="flex flex-col w-24 mt-5">
					<div className="text-lg font-medium text-gray-700">{weeklyReward}</div>
					<div className="text-nowrap text-sm font-light text-gray-700">Weekly Reward</div>
				</div>
			</div>
		</Card>
	);
};
export default Information;
