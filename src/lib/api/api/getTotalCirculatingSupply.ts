import { get } from "../service";
import { getCirculatingSupply } from "../queries";

export const getTotalCirculatingSupply = async (): Promise<bigint> => {
	console.log("circulating supply", await get(getCirculatingSupply()));
	return await get(getCirculatingSupply());
};
