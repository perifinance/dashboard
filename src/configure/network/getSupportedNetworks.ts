import { SUPPORTED_NETWORKS } from "./SUPPORTED_NETWORKS"
let networkIds = [];
export const getSupportedNetworks = (): Array<Number> => {
    
    if(networkIds.length === 0 ) {
        networkIds = Object.keys(SUPPORTED_NETWORKS).map(e=>Number(e));
    }
    return networkIds;
}