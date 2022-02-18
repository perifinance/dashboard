import { chartRate } from '../queries'
import { get } from '../service'
import {
    format,
} from 'date-fns';
import { utils } from 'ethers'
import { formatCurrency } from 'lib'

type ChartRateParameter = {
    currencyName: String
    networkId: number,
    page?: number, 
    first?: number, 
    chartTime?: String
}
export const getChartRates = async({currencyName, networkId, page = undefined, first = undefined} : ChartRateParameter) => {
    let searchDate = (Number((new Date().getTime() / 1000).toFixed(0)) - (60 * 60 * 24)).toString();

    let data = await get(chartRate({networkId, currencyName, page, first, searchDate}));

    return data.map(e => { 
        return {
            price: utils.formatEther(e.price),
            low: utils.formatEther(e.low),
            high: utils.formatEther(e.high),
            formatPrice: formatCurrency(e.price, 6),
            formatLow: formatCurrency(e.low, 6),
            formatHigh: formatCurrency(e.high, 6),
            timestamp: e.timestamp / 1000,
            time: format(e.timestamp, 'HHaa')
        }
    });
}