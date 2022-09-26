import { exchangeCount } from '../queries'
import { get } from '../service'
import { subDays } from 'date-fns'
import dexNetworkId from 'configure/network/dexNetworkId'

export const getExchangeCount = async () => {
    const searchDate = (Number(subDays(new Date(),1)) / 1000).toFixed(0);
    let count = 0;
    (await get(exchangeCount({networkId: dexNetworkId, searchDate}))).forEach(e => {
        count = count + e.count
    });
    return count
}