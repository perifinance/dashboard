import { useEffect, useState } from "react";
import Card from "components/Card"
import Title from "components/Title"
import PieChart from "components/PieChart"
import { useSelector } from "react-redux";
import { RootState } from 'reducers'
import ColorVerticalLabel from "components/ColorVerticalLabel"
import AreaChart from "components/AreaChart"
import { getSupportedNetworks, SUPPORTED_NETWORKS } from "configure/network"
import { formatShortenCurrency, formatNumberToPer } from 'lib/format'
import { getColors } from 'lib'
import { utils } from 'ethers'
const colors = ['bg-blue-500', 'bg-orange-500', 'bg-pink-700', 'bg-blue-700'];

const DebtByNetworks = () => {
    const { stakeIsReady }  = useSelector((state: RootState) => state.app);
    const networkCachedDebts = useSelector((state: RootState) => state.networkCachedDebts);
    const {networkByDebtCashes} = useSelector((state: RootState) => state.networkByDebtCashes);
    const [networkDebts, setNetworkDebts] = useState([]);
    const [totalDebts, setTotalDebts] = useState(0);
    const init = () => {
        let total = 0n
        const networkDebts = getSupportedNetworks().map((e,index) => {
            total = total + networkCachedDebts[e.toString()].total;
            return {
                networkId: e,
                color: colors[index],
                networkName: SUPPORTED_NETWORKS[e.toString()],
                totalDebt: networkCachedDebts[e.toString()].total,
                per: formatNumberToPer(networkCachedDebts[e.toString()].total, networkCachedDebts.total.total)
            }
        })
        
        setTotalDebts(Number(utils.formatEther(total/BigInt(4))));
        setNetworkDebts(networkDebts.sort((a, b) => Number(b.totalDebt) - Number(a.totalDebt)));
    }

    useEffect(() => {
        if(stakeIsReady) {
            init();
        }
    }, [stakeIsReady])
    return  <Card>
                <>
                <div className="flex flex-col lg:flex-row lg:justify-between">
                    <div>
                        <Title>Debt by Networks</Title>
                        <div className="flex space-x-5 my-4 items-center">
                            <div className="w-40 lg:w-52 h-40 lg:h-52">
                                <PieChart x={'networkName'} y={'per'} data={networkDebts} colors={getColors(networkDebts)}></PieChart>
                            </div>
                            <div className="space-y-3 lg:space-y-5 self-center flex-1">
                                <div>
                                    <div className="text-3xl lg:text-4xl text-blue-500 font-medium">{formatShortenCurrency(totalDebts)}</div>
                                    <div className="text-sm text-gray-700 font-normal">Total Debt</div>
                                </div>
                            </div>
                        </div>
                        <div className="flex lg:hidden flex-wrap space-y-2 lg:gap-2">
                            {networkDebts.map((networkDebt) => {
                                return <ColorVerticalLabel color={networkDebt.color} text={networkDebt.networkName} per={networkDebt.per} key={networkDebt.networkName}></ColorVerticalLabel>
                            })}
                        </div>
                    </div>
                    
                    <div className="w-full h-32 lg:self-center lg:h-44 lg:pl-10">
                        <AreaChart data={networkByDebtCashes} colors={colors}></AreaChart>
                    </div>
                </div>
                <div className="hidden lg:flex flex-wrap space-y-2 lg:gap-2">
                    {networkDebts.map((networkDebt) => {
                        return <ColorVerticalLabel color={networkDebt.color} text={networkDebt.networkName} per={networkDebt.per} key={networkDebt.networkName}></ColorVerticalLabel>
                    })}
                </div>
                </>
            </Card>
}
export default DebtByNetworks;