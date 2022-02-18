import { utils } from 'ethers'
export const formatCurrency = (value, decimals = 2) => {
	if(!value) return '0';

	
	const addComma = Number(utils.formatEther(value)).toLocaleString('en', {maximumFractionDigits: decimals});

	return addComma ? addComma : value.toLocaleString();
};

