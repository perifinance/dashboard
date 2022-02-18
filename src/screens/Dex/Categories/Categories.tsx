import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from 'reducers'

import Card from "components/Card"
import Title from "components/Title"
import Progress from "components/Progress"
import pynthsCategories from "configure/coins/categories"
import pynths from "configure/coins/pynths"
import dexNetworkId from 'configure/network/dexNetworkId' 
import { getExchangeCount } from "lib/thegraph/api" 
import { formatShortenCurrency, formatNumberToPer, formatCurrency } from 'lib/format'

const Categories = () => {
    const { dexIsReady }  = useSelector((state: RootState) => state.app);
    const { totalSupplies }  = useSelector((state: RootState) => state.totalSupplyPynths); 
    const { exchangeVolumes }  = useSelector((state: RootState) => state.exchangeVolumes);
    const exchangeRates  = useSelector((state: RootState) => state.exchangeRates);

    const [ categoryByTotalSupplies, setCategoryByTotalSupplies ] = useState({});
    const [ totalSupply, setTotalSupply ] = useState(0n);
    const [ totalVolume, setTotalVolume ] = useState(0n);
    const [ exchangeCount, setExchangeCount ] = useState(0);
    const getTotalSuppliesAddCatagory = () => {
        return totalSupplies.map(e => {
            const pynth = pynths[dexNetworkId].find(pynth => pynth.symbol === e.pynthName)
            return {
                ...e,
                catagory: pynth ? pynth.categories : []
            }
        })
    }

    const getCategoryByTotalSupply = () => {
        let total = 0n;
        const totalSuppliesAddCatagory = getTotalSuppliesAddCatagory();
        let catagoryByTotalSupply = {}

        totalSuppliesAddCatagory.forEach(item => {
            item.catagory.forEach(catagory => {
                if(!catagoryByTotalSupply[catagory]) {
                    catagoryByTotalSupply[catagory] = 0n
                }
                const pynthByTotalUSD = item.totalSupply * exchangeRates[item.pynthName] / 10n ** 18n
                catagoryByTotalSupply[catagory] = catagoryByTotalSupply[catagory] + pynthByTotalUSD;
                total = total + pynthByTotalUSD;
            })
        })
        setTotalSupply(total);
        return catagoryByTotalSupply;
    }

    const getTotalVolume = () => {
        let total = 0n
        exchangeVolumes.forEach(volume => {
            const pynthsByVolume = volume.reduce((a, b) => {                    
                
                return a + b.usdVolume;
            }, 0n);
            total = total + pynthsByVolume;
        })
        return total;
    }

    const init = async () => {
        const exchangeCount = await getExchangeCount();
        setCategoryByTotalSupplies(getCategoryByTotalSupply())
        setTotalVolume(getTotalVolume())
        setExchangeCount(exchangeCount);
    }

    useEffect(() => {
        if(dexIsReady) {
            init();
        }
    },[dexIsReady, totalSupplies])

    return <Card>
                <div className="flex flex-col lg:flex-row gap-5 lg:gap-14">
                    <div className="lg:w-40">
                        <Title>Categories</Title>
                        <div className="flex flex-wrap mt-4">
                            {pynthsCategories.map(e => {
                                if(['currencies', 'crypto', 'commodities', 'indices'].includes(e)) {
                                    return <Progress text={e.charAt(0).toUpperCase() + e.slice(1)} per={formatNumberToPer(categoryByTotalSupplies[e], totalSupply)}></Progress>
                                } else {
                                    return <></>
                                }
                            }) }
                        </div>
                    </div>
                    <div>
                        <div className="flex flex-col mt-4 lg:mt-0">
                            <Title>24H Exchange Overview</Title>
                            <div className="flex flex-col mb-4">
                                <div className="text-4xl font-medium">${formatCurrency(totalVolume, 0)}</div>
                                <div className="text-sm font-normal text-gray-700">Total Trading Volume</div>
                            </div>
                            <div className="flex flex-col mb-4">
                                <div className="text-2xl font-medium text-gray-700">
                                    {exchangeCount}
                                </div>
                                <div className="text-sm font-normal text-gray-700">
                                    Total Trades
                                </div>
                            </div>
                            <div className="flex space-x-4">
                                {/* <div className="flex flex-col">
                                    <div className="text-4xl font-medium">5.29%</div>
                                    <div className="text-sm font-normal text-gray-700">Debt Inflation</div>
                                </div> */}
                                {/* <div className="flex flex-col justify-end">
                                    <div className="text-2xl font-medium text-gray-700">
                                        32
                                    </div>
                                    <div className="text-sm font-normal text-gray-700">
                                        Active Traders
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
                   
                
           </Card>
}
export default Categories;