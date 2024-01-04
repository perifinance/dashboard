import { useSelector } from "react-redux";
import { RootState } from 'reducers'
import { formatCurrency } from 'lib/format'
import Title from "components/Title"
import Card from "components/Card";

const Holders = () => {
    const { count } = useSelector((state: RootState) => state.periholderCounts);
    return (
        <Card>
            <Title>PERI Holders</Title>
            <div className="flex flex-col gap-4 items-end md:gap-0 md:justify-center md:h-4/6 ">
                <span className="w-24 text-2xl md:text-3xl font-medium text-gray-500">{formatCurrency(count, 0)}</span> 
                <span className="w-24 text-sm font-light text-gray-700">Total Holders</span>
            </div>
        </Card>
    )
}
export default Holders;