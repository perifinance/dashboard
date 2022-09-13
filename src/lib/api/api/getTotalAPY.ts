import { get } from "../service";
import { getAPY } from "../queries";

export const getTotalAPY = async (): Promise<string> => {
	const totalAPY = await get(getAPY());
	// console.log("totalAPY", totalAPY);
	return await get(getAPY());
};
