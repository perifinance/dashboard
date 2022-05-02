export const SUPPORTED_NETWORKS = process.env.REACT_APP_ENV === 'production' ? {
	1: 'ETHEREUM',
	56: 'BSC',
	137: 'POLYGON',
    1285: 'MOONRIVER',
} : {
    42: 'KOVAN',
    97: 'BSCTEST',
    80001: 'MUMBAI',
    1287: 'MBase',
};