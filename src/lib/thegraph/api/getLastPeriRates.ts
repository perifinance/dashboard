import pynths from "configure/coins/pynths"
import { lastPeriRate } from '../queries'
import { get } from '../service'
import dexNetworkId from 'configure/network/dexNetworkId' 

export const getLastPeriRates = () => {
    const promise = [];

    pynths[dexNetworkId.toString()].forEach(pynth => {
        const currencyName = pynth.symbol;
        promise.push(get(lastPeriRate({networkId: dexNetworkId})));
    });
    
    return Promise.all(promise).then(rates => {
        let keys = {}
        rates.forEach(e => {
            keys[e.currencyName] = e.price;
        })
        return keys;
    });
}