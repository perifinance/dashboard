import { debtCaches } from '../queries'
import { get } from '../service'
import { getSupportedNetworks } from 'configure/network/getSupportedNetworks'
import { addDays } from 'date-fns'
import { formatDay } from "lib/format"
export const getDebtCaches = async() => {
    let day = 30;
    let searchDate = (Number((new Date().getTime() / 1000).toFixed(0)) - (60 * 60 * 24 * day)).toString();
    let promise = [];
    const datas = {};
    const supportedNetworks = getSupportedNetworks();
    supportedNetworks.forEach(networkId => {
        promise.push((async()=>{
            return datas[networkId.toString()] = await get(debtCaches({searchDate, networkId}))
        })());
    })
    return await Promise.all(promise).then((debtCaches) => {
        let days = [];

        for(let a=1; a < day+1; a++) {   
            let day = addDays(new Date(Number(searchDate) * 1000), a);
            days.push(formatDay(Number(day) / 1000));
        }
        return days.map( (day) => {
            let privios = [];
            let returnValue = {

            };
            debtCaches.forEach((e, i) => {
                e.forEach(element => {
                    if(!privios[i]) {
                        privios[i] = element;
                    } 
                    if(day === element.date) {
                        returnValue[supportedNetworks[i].toString()] = element.debtBalanceToNumber;
                        privios[i] = element;
                    } else {
                        returnValue[supportedNetworks[i].toString()] = privios[i].debtBalanceToNumber;
                    }
                });
            })
            return {
                ...returnValue,
                min: Math.min(...Object.values(returnValue).map(e=>Number(e))),
                max: Math.max(...Object.values(returnValue).map(e=>Number(e)))
            };
            
        })
        return debtCaches
    });
    
    
    
}