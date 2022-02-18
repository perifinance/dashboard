import coin from "configure/coins/pynths"
import { getSupportedNetworks } from "configure/network/getSupportedNetworks"
import { totalSupply } from '../queries'
import { get } from '../service'

export const getTotalSupplyPynths = async () => {
    const promise = [];
    
    getSupportedNetworks().forEach(networkId => {
        coin[networkId.toString()].forEach(pynth => {
            const pynthName = pynth.symbol;
            promise.push(get(totalSupply({pynthName, networkId})));
        });
    });
    
    return await Promise.all(promise)
}