import { gql } from '@apollo/client'

export const totalSupply = ({pynthName, networkId}) => {
    const mapping = (data) => {
        return {
            totalSupply: BigInt(data.totalSupply),
            pynthName: data.pynthName,
            networkId
        }
    }
    
    return {
        url: `ProxyERC20${pynthName}-${process.env.REACT_APP_ENV === 'production' ? 'Real' : 'Dev'}`,
        query: gql`query totalSupply {
            totalSupply(id: "0") {
                    totalSupply
                    pynthName
                }
            }
        `,
        variables: {},
        mapping: ({data}) => {
            return mapping(data.totalSupply);
        },
        errorCallback: () => {
            return {
                totalSupply: 0n,
                pynthName,
                networkId
            }
            
        },
        networkId
    }
}