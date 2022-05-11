import { useEffect, useState } from "react";
import {
  AreaChart as RechartsAreaChart,
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import { getSupportedNetworks } from "configure/network";
import { CSSToColors } from "configure/color";
const AreaChart = ({ data, colors }) => {
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);
  useEffect(() => {
    if (data.length > 0) {
      let min;
      let max;

      data.forEach((e) => {
        if (!min || min > e.min) {
          min = e.min;
        }

        if (!max || max > e.max) {
          max = e.max;
        }
      });
      setMin(min);
      setMax(max);
    }
  }, [data])

  const toPercent = (decimal, fixed = 0) => {
    return `${(decimal * 100).toString()}%`;
  };

  return <ResponsiveContainer width="100%" height="100%" maxHeight={1250}>
        <RechartsAreaChart
          data={data}
          stackOffset="expand"
          margin={{
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
          }}
        >
        <defs>
          {colors.map((color: string, index) => {
            return (
              <linearGradient
                key={index}
                id={index}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor={`${CSSToColors[color]}`}
                  stopOpacity={1}
                />
                <stop
                  offset="95%"
                  stopColor={`${CSSToColors[color]}`}
                  stopOpacity={0}
                />
              </linearGradient>
            );
          })}
        </defs>
          <XAxis axisLine={false} tickLine={false} dataKey={"date"} />
          <YAxis axisLine={false} tickLine={false} ticks={["0", "0.25", "0.5", "0.75", "1"]} interval={0} tickFormatter={toPercent} padding={{top:10}}/>
          
        {getSupportedNetworks().map((networkId, index) => (
          <Area
            type="monotone"
            stackId="1"
            dataKey={(e) => e[networkId.toString()]}
            stroke={`${CSSToColors[colors[index]]}`}
            fillOpacity={1}
            fill={`url(#${index})`}
            key={index}
          />
        ))}
      </RechartsAreaChart>
    </ResponsiveContainer>
};

export default AreaChart;
