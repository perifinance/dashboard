import { VictoryPie } from 'victory'
import { useWindowSize } from 'Hook'
import { CSSToColors } from 'configure/color'
import { formatNumberToPer } from 'lib/format'
const PieChart = ({x, y, data, colors, total = null}) => {
    const windowSize = useWindowSize();
    const convertColors = colors.map(e => CSSToColors[e]);

    return  <VictoryPie
                data={data}
                startAngle={90}
                endAngle={450}
                x={(d) => d[x] }
                y={(d) => {return typeof total === 'bigint' ? formatNumberToPer(d[y], total) : d[y]}}
                colorScale={convertColors}
                padding={0}
                innerRadius={windowSize?.width < 1024 ? 120 : 140}
                style={{ labels: { fill: "white", fontSize: 0 } }}  
            />
}
export default PieChart;