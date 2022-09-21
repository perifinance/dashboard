import Card from "components/Card";
import { formatCurrency } from "lib/format";
const PynthsCard = ({ pynths }) => {
	console.log(pynths);

	return (
		<Card>
			<div className="flex flex-col lg:flex-row">
				<div className="flex flex-col lg:flex-row lg:w-48 items-center lg:gap-2 pt-2">
					<img
						className="w-6 h-6 lg:self-start lg:mt-2"
						src={`/images/currencies/${pynths.symbol === "pINCH" ? "p1INCH" : pynths.symbol}.png`}
					></img>
					<div className="flex flex-col mt-2 mb-5 items-center lg:my-auto lg:items-start lg:gap-1">
						<div className="text-xl lg:text-2xl font-bold text-gray-500">
							{pynths.symbol}
							<span className="text-sm font-normal ml-1">{pynths.name}</span>
						</div>
						<div className="text-base font-light text-gray-700">
							${pynths.name === "USD" ? formatCurrency(pynths.totalSupplyToUSD, 2) : formatCurrency(pynths.totalSupplyToUSD * (10n ** 10n), 2)}
						</div>
					</div>
				</div>
				<div className="hidden bg-gray-900 lg:block h-14 w-px mt-2 self-center"></div>
				<div className="flex lg:flex-col items-center w-full lg:w-32 lg:items-start lg:h-full lg:my-auto lg:ml-4 lg:gap-1">
					<div className="flex flex-1 text-lg font-bold items-center justify-center h-5">
						<img className="w-5 h-5 mx-2" src={`/images/icon/database.svg`}></img>
						{formatCurrency(pynths.totalSupply, Number(pynths.totalSupply / 1000000000000000000n) > 1000 ? 2 : 5)}
					</div>
					<div className="h-8 border-l border-gray-900 lg:hidden"></div>
					<div className="flex flex-1 text-lg font-bold items-center justify-center">
						<img className="w-5 h-5 mx-2" src={`/images/icon/dollar.svg`}></img>
						${pynths.name === "USD" ? formatCurrency(pynths.rate, 2) : formatCurrency(pynths.rate * (10n ** 10n), 2)}
					</div>
				</div>
			</div>
		</Card>
	);
};
export default PynthsCard;
