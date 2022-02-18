import { useEffect, useState } from "react";
import { useSelector, useStore } from "react-redux";
import { RootState } from 'reducers'
import { formatCurrency } from 'lib/format'
import { ResponsiveContainer, AreaChart, Area, Tooltip, XAxis, YAxis } from 'recharts';
import Card from "components/Card"
import Title from "components/Title"
import { utils } from 'ethers'

const Overview = () => {
    const { stakeIsReady }  = useSelector((state: RootState) => state.app);
    const { rates }  = useSelector((state: RootState) => state.periChartRates);
    const { circulatingSupply }  = useSelector((state: RootState) => state.circulatingSupply);
    
    const [lastRate, setLastRate] = useState({
        price: '0',
        formatPrice: '0.000000',
        formatLow: '0.000000',
        formatHigh: '0.000000'
    });
    const [per, setPer] = useState('0.00');
    const [marketCap, setMarketCap] = useState(0n);

    const getPer = () => {
        const lastPrice = Number(lastRate.price);
        const fristPrice = Number(rates[0].price);
        return (((lastPrice - fristPrice) / fristPrice ) * 100).toFixed(2);
    }

    const getMarketCap = () => {
        return BigInt(Number(lastRate.price) * (10 ** 18)) * circulatingSupply / 10n ** 18n;
    }

    useEffect(() => {
        if(stakeIsReady) {
            setLastRate(rates[rates.length-1]);
            
        }
    },[stakeIsReady])

    useEffect(() => {
        if(stakeIsReady && Number(lastRate.price) > 0) {
            setPer(getPer());
            setMarketCap(getMarketCap())
        }
    },[stakeIsReady, lastRate])


    
    return <Card>
                <Title>24 Hours Overview</Title>
                <div className="flex flex-wrap mt-4 lg:gap-5">
                    <div className="flex flex-col w-1/2 lg:w-max mb-4">
                        <div className="text-sm font-light text-gray-700">Market Cap</div>
                        <div className="text-xl font-medium text-blue-500 ">${formatCurrency(marketCap, 0)}</div>
                    </div>
                    
                    <div className="flex flex-col w-1/2 lg:w-max pl-5">
                        <div className="text-sm font-light text-gray-700">PERI Current Price</div>
                        <div className="flex flex-col lg:flex-row lg:gap-5 lg:items-end">
                            <div className="text-xl font-medium text-blue-500">${lastRate.formatPrice}</div>
                            <div className={`flex w-20 h-6 rounded-xl ${ Number(per) > 0 ? 'text-blue-800 bg-blue-900' : 'text-red-800 bg-red-900'} text-sm font-medium items-center lg:mb-1`}>
                                <div className="leading-none text-center mx-2">{Number(per) > 0 ? '▲' :'▼'} {per}%</div>
                            </div>
                        </div>
                        {/* ▲ -0.54% */}
                    </div>

                    <div className="flex flex-col w-1/2 lg:w-max mb-4">
                        <div className="text-sm font-light text-gray-700">
                            24H High
                        </div>
                        <div className="text-lg font-light text-gray-700">
                            ${lastRate.formatHigh}
                        </div>
                    </div>
                    <div className="flex flex-col w-1/2 lg:w-max pl-5">
                        <div className="text-sm font-light text-gray-700">
                            24H Low
                        </div>
                        <div className="text-lg font-light text-gray-700">
                            ${lastRate.formatLow}
                        </div>
                    </div>
                </div>
                <div className="w-full h-20 text-2xs lg:max-w-100">
                    <ResponsiveContainer width="100%" height="100%" debounce={1} maxHeight={80}>
                        <AreaChart data={rates}
                            margin={{ top: 5, right: 0, left: 0, bottom: 20 }}>
                            <defs>
                                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#1D86FE" stopOpacity={0.8}/>
                                    <stop offset="95%" stopColor="#1D86FE" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            
                            
                            <XAxis dataKey="time" height={1} axisLine={false} tickLine={false}/>
                            <YAxis dataKey="price" domain={['dataMin', 'dataMax']} tickFormatter={(e)=>(e)} hide={true}/>
 
                            {/* 라인 */}
                            
                            <Area type="monotone" dataKey="price" fillOpacity={1} stroke="#1D86FE" fill="url(#colorUv)" strokeWidth={3}/>
                            
                        </AreaChart>
                    </ResponsiveContainer>
                </div>   
           </Card>
}
export default Overview;