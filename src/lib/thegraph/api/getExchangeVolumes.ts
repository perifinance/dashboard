import coin from "configure/coins/pynths"
import { exchageVolume } from '../queries'
import { get } from '../service'
import { subDays } from 'date-fns'
import dexNetworkId from 'configure/network/dexNetworkId' 

export const getExchangeVolumes = async () => {
    const promise = [];
    const searchDate = (Number(subDays(new Date(),5)) / 1000).toFixed(0);

    coin[dexNetworkId.toString()].forEach(pynth => {
        const pynthName = pynth.symbol;
        promise.push(get(exchageVolume({pynthName, networkId: dexNetworkId, searchDate})));
    });
    
    return await Promise.all(promise)
}