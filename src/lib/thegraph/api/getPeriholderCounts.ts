import { holderCount } from '../queries'
import { get } from '../service'
import { getSupportedNetworks } from 'configure/network'
export const getPeriholderCounts = () => {
    let promise = []
    getSupportedNetworks().forEach(networkId => {
        promise.push(get(holderCount({networkId})))
    });

    return Promise.all(promise).then((data) => {
        
        return data.reduce((a, b) => {
            return a + b.count
        }, 0n);
    })

}