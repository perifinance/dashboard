import { tokenTicker } from "../queries";
import { get } from "../service";

export const getTokenTicker = async ({ currencyName, networkId }) => {
	let data = await get(tokenTicker({ currencyName, networkId }));

	return data;
};
