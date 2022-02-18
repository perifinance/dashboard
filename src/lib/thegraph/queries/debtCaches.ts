import { gql } from '@apollo/client'
import { formatCurrency } from 'lib'
import { formatDay } from 'lib/format'
import { utils } from 'ethers'
export const debtCaches = ({page = 0, first = 1000, searchDate = '0', networkId}) => {
    const skip = page * first;
    
    const RateMapping = (data) => {
        return {
            debtBalance: BigInt(data.debtBalance),
            debtBalanceToString: utils.formatEther(data.debtBalance),
            debtBalanceToNumber: Number(utils.formatEther(data.debtBalance)),
            formatDebtBalance: formatCurrency(BigInt(data.debtBalance), 6), 
            timestamp: Number(data.timestamp),
            date: formatDay(data.timestamp)
        }
    }
    return {
        url: `DebtCache-${process.env.REACT_APP_ENV === 'production' ? 'Real' : 'Dev'}`,
        query: gql`
            query getDailyDebtCache($skip: Int!, $first: Int!, $searchDate: String!) {
                dailyDebtCaches(skip: $skip, first: $first, where: {timestamp_gt: $searchDate}, orderBy: timestamp, orderDirection: asc) {
                    debtBalance
                    timestamp
                }
            }
        `,
        variables: {skip, first, searchDate},
        mapping: ({data}) => {    
            
            return data.dailyDebtCaches.map((item) => RateMapping(item));
        },
        errorCallback: () => {
            return []
        },
        networkId
    }

}

