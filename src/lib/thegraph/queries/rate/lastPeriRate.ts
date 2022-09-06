import { gql } from '@apollo/client'
import { utils } from 'ethers'
export const lastPeriRate = ({skip = 0, first = 1, networkId}) => {
    const currencyName = 'PERI';
    const currencyKey = utils.formatBytes32String(currencyName);
    
    const RateMapping = (data) => {
        let price = 0n
        try {
            price = BigInt(data.price);
        } catch(e) {

        }

        return {
            price,
            currencyName: data.currencyName
        }
    }

    return {
        url: `ExchangeRates-${process.env.REACT_APP_ENV === 'production' ? 'Real' : 'Dev'}`,
        query: gql`
            query GetLastRates($currencyKey: String!, $skip: Int!, $first: Int!) {
                lastRates(skip: $skip, first: $first, where: {currencyKey: $currencyKey}) {
                    price
                }
            }
        `,
        variables: {currencyKey, skip, first},
        mapping: ({data}) => {
            return RateMapping({price:data.lastRates[0].price, currencyName:'PERI'})
        },
        errorCallback: () => {
            return RateMapping({price: 0n, currencyName:'PERI'})
        },
        networkId
    }
}