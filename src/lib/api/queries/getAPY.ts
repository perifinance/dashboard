export const getAPY = () => {
	return {
		url: "apy",
		params: {},
		mapping: ({ data }) => {
			console.log("APY data", data);
			return Number(data).toFixed(2);
		},
	};
};
