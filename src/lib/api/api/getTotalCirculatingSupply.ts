import { get } from "../service";
import { getCirculatingSupply } from "../queries";

export const getTotalCirculatingSupply = async (): Promise<bigint> => {
	const totalCirculatingSupply = await get(getCirculatingSupply());
	console.log("totalCirculatingSupply", totalCirculatingSupply);
	return await get(getCirculatingSupply());
};
