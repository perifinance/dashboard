import { useSelector } from "react-redux";
import { RootState } from 'reducers'
import { formatCurrency } from 'lib/format'
import Card from "components/Card"
import Title from "components/Title"

const Holders = () => {
    const { count } = useSelector((state: RootState) => state.periholderCounts);

    return <Card>
                <Title>PERI Holders</Title>
                <div className="flex lg:flex-col gap-4 items-end lg:items-start lg:gap-0 lg:justify-center lg:h-4/6">
                    <div className="text-4xl lg:text-3xl font-medium">{formatCurrency(count, 0)}</div> 
                    <div className="text-sm font-light text-gray-700">Number of Holders</div>
                </div>
            </Card>
    
}
export default Holders;