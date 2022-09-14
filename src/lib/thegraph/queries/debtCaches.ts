import { gql } from "@apollo/client";
import { formatCurrency } from "lib";
import { formatDay } from "lib/format";
import { utils } from "ethers";
export const debtCaches = ({ page = 0, first = 1000, searchDate = 0, networkId }) => {
	const skip = page * first;

	const RateMapping = (data) => {
		console.log("debtCaches", data, {
			debtBalance: BigInt(data.debtBalance),
			debtBalanceToString: utils.formatEther(data.debtBalance),
			debtBalanceToNumber: Number(utils.formatEther(data.debtBalance)),
			formatDebtBalance: formatCurrency(BigInt(data.debtBalance), 6),
			timestamp: Number(data.timestamp),
			date: formatDay(data.timestamp),
		});

		return {
			debtBalance: BigInt(data.debtBalance),
			debtBalanceToString: utils.formatEther(data.debtBalance),
			debtBalanceToNumber: Number(utils.formatEther(data.debtBalance)),
			formatDebtBalance: formatCurrency(BigInt(data.debtBalance), 6),
			timestamp: Number(data.timestamp),
			date: formatDay(data.timestamp),
			network: data.network, // ! new
		};
	};

	let network;
	switch (networkId) {
		case 1:
			network = "ETHEREUM";
			break;
		case 56:
			network = "BSC";
			break;
		case 137:
			network = "POLYGON";
			break;
		case 1285:
			network = "MOONRIVER";
			break;
		default:
			network = "";
			break;
	}

	console.log("debtCaches param", skip, first, searchDate, network);

	return {
		url: "",
		query: gql`
			query {
				dailyDebtCaches(skip: ${skip}, first: ${first}, network: "${network}", timestamp: ${searchDate}) {
					debtBalance
					network
					timestamp
				}
			}
		`,
		variables: { skip, first, searchDate },
		mapping: ({ data }) => {
			return data.dailyDebtCaches.map((item) => RateMapping(item));
		},
		errorCallback: () => {
			console.error("debtCaches query error");
			return [];
		},
		networkId,
	};
};
