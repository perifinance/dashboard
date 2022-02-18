import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from 'reducers'
import { utils } from 'ethers'
import { formatShortenCurrency, formatNumberToPer } from 'lib/format'
import pynths from 'configure/coins/pynths'
import dexNetworkId from 'configure/network/dexNetworkId'
import Card from "components/Card"
import Title from "components/Title"

const Performance = () => {
    const { dexIsReady }  = useSelector((state: RootState) => state.app);
    const { exchangeVolumes }  = useSelector((state: RootState) => state.exchangeVolumes);
    const { rateChanges }  = useSelector((state: RootState) => state.rateChanges);
    const exchangeRates  = useSelector((state: RootState) => state.exchangeRates);
    const [ pynthsByVolumes, setPynthsByVolumes ] = useState([]);

    const getPynthsByVolumes = () => {
        const pynthsByVolumes = exchangeVolumes.map(volume => {
        
            const pynthsByVolume = volume.reduce((a, b) => {                    
                
                return a + b.usdVolume;
            }, 0n);

            return {
                ...volume[0],
                ...pynths[dexNetworkId].find(e => volume[0].currencyName === e.symbol),
                usdVolume: pynthsByVolume
            }
        })
        return pynthsByVolumes.sort((a,b) => Number(b.usdVolume - a.usdVolume))
    }

    const init = () => {
        let pynthsByTotalSupplies = getPynthsByVolumes();
        setPynthsByVolumes(pynthsByTotalSupplies);
    }

    useEffect(() => {
        if(dexIsReady) {
            init();
        }
    },[dexIsReady, exchangeVolumes])


    return <Card>
                <div className="h-full overflow-y-scroll">
                    <div className="inline-block static">
                        <Title>Performance</Title>
                    </div>
                    <table className="w-full text-xs text-gray-700">
                        <thead className="text-sm bg-navy-800 border-t-2 border-b-2 border-gray-900">
                            <tr>
                                <th className="px-4 py-1 font-normal border-r border-gray-900">Tokens (pUSD)</th>
                                <th className="px-4 py-1 font-normal border-r border-gray-900">Price</th>
                                <th className="px-4 py-1 font-normal border-r border-gray-900">24H Change</th>
                                <th className="px-4 py-1 font-normal">24H Volume</th>
                            </tr>
                        </thead>
                        <tbody className="lg:text-base font-normal">
                            {pynthsByVolumes.map(e => 
                                
                                e.symbol !== 'pUSD' && <tr className="border-b border-gray-900">
                                    <td className="p-2 border-r border-gray-900">
                                        <div className="flex flex-col lg:flex-row lg:gap-2">
                                            <img className="hidden lg:block w-5 h-5 self-center" src={`/images/currencies/${e.symbol}.png`}></img>
                                            <div className="text-sm lg:text-base text-gray-500 font-medium lg:font-bold">{e.symbol}</div>
                                            {e.name}
                                        </div>
                                    </td>
                                    <td className="p-2 text-right border-r border-gray-900">${formatShortenCurrency(utils.formatEther(exchangeRates[e.symbol]))}</td>
                                    <td className={`p-2 text-center border-r border-gray-900 ${Number(rateChanges[e.symbol]) > 0 ? 'text-blue-800' : 'text-red-800'}`}>{Number(rateChanges[e.symbol]) > 0 ? '▲' :'▼'} {rateChanges[e.symbol]}%</td>
                                    <td className="p-2 text-right">${formatShortenCurrency(utils.formatEther(e.usdVolume))}</td>
                                </tr> 
                            )}
                            
                            
                        </tbody>

                    </table>
                </div>
                
           </Card>
}
export default Performance;