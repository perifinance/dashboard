import { gql } from '@apollo/client'

export const stableDebt = ({networkId}) => {
    const mapping = (data) => {
        return {
            id: data.id,
            amount: BigInt(data.amount),
            networkId
        }
    }
    
    return {
        url: `StakingState-${process.env.REACT_APP_ENV === 'production' ? 'Real' : 'Dev'}`,
        query: gql`query GetStakeAmount {
            stakeAmounts(skip: 0, first:1000) {
                    id
                    amount
                }
            }
        `,
        variables: {},
        mapping: ({data}) => {
            return data.stakeAmounts.map((item) => {
                return mapping(item);
            });
        },
        errorCallback: () => {
            return [
                {
                    id: 'USDC',
                    amount: 0n,
                    networkId
                },
                {
                    id: 'DAI',
                    amount: 0n,
                    networkId
                }

            ]
        },
        networkId
    }
}