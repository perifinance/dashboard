import { gql } from '@apollo/client'

export const holderCount = ({networkId}) => {
    
    const RateMapping = (data) => {
        return {
            count: BigInt(data.count) * 10n ** 18n
        }
    }
    return {
        url: `ProxyERC20-${process.env.REACT_APP_ENV === 'production' ? 'Real' : 'Dev'}`,
        query: gql`
            query getHolderCount {
                periholderCounts {
                    count
                }
            }
        `,
        variables: {},
        mapping: ({data}) => {    
            
            return RateMapping(data.periholderCounts[0]);
        },
        errorCallback: () => {
            return {count: 0n}
        },
        networkId
    }

}

