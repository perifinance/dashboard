import { gql } from '@apollo/client'
import { utils } from 'ethers'
export const lastRate = ({currencyName = undefined, skip = 0, first = 1, networkId}) => {
    const currencyKey = currencyName && utils.formatBytes32String(currencyName);
    
    const RateMapping = (data) => {
        let price = 0n
        try {
            price = BigInt(data.price);
        } catch(e) {

        }

        return {
            price,
            currencyName: data.currencyKey && utils.parseBytes32String(data.currencyKey)
        }
    }

    return {
        url: `ExchangeRates-${process.env.REACT_APP_ENV === 'production' ? 'Real' : 'Dev'}`,
        query: currencyName ? gql`
            query GetLastRates($currencyKey: String!, $skip: Int!, $first: Int!) {
                lastRates(skip: $skip, first: $first, where: {currencyKey: $currencyKey}) {
                    price
                    currencyKey
                }
            }
        ` : gql`
            query GetLastRates {
                lastRates(skip: 0, first:1000) {
                    price
                    currencyKey
            }
        }`,
        variables: {currencyKey, skip, first},
        mapping: ({data}) => {        
            if(currencyName === 'pUSD') {
                return RateMapping({price: 10n ** 18n, currencyKey})
            } else {
                return RateMapping(data.lastRates[0])      
            }        
        },
        errorCallback: () => {
            return RateMapping({price: 0n, currencyName})
        },
        networkId
    }
}