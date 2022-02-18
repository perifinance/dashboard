import { useSelector } from "react-redux";
import { RootState } from 'reducers'

import Card from "components/Card"
import Title from "components/Title"

const Information = () => {
    const { APY }  = useSelector((state: RootState) => state.APY);
    return <Card>
                <div className="flex lg:gap-5">
                    <div className="flex flex-col w-1/2">
                        <Title>PERI APY</Title>
                        <div className="flex flex-col">
                            <div className="text-2xl lg:text-4xl font-medium text-gray-500">
                            {APY}%
                            </div>
                            <div className="text-sm font-normal text-gray-700">
                            Est. APY
                            </div>
                        </div>
                        <div className="flex flex-col lg:mt-5">
                            <div className="text-lg font-medium text-gray-700">
                            76,924
                            </div>
                            <div className="text-base font-normal text-gray-700">
                            PERI Weekly Reward
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col w-1/2 pl-5">
                        <Title>　　　　　　　</Title>
                        <div className="flex flex-col">
                            <div className="text-2xl lg:text-4xl font-medium text-gray-500">
                            　
                            </div>
                            <div className="text-sm font-normal text-gray-700">
                            　
                            </div>
                        </div>
                        <div className="flex flex-col lg:mt-5">
                            <div className="text-lg font-medium text-gray-700">
                            500
                            </div>
                            <div className="text-base font-normal text-gray-700">
                            Target
                            </div>
                        </div>
                    </div>
                </div>
           </Card>
}
export default Information;