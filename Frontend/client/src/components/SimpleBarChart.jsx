import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import {
  axisClasses,
} from '@mui/x-charts';


let xLabels = [];
for(let i=1;i<=15;i++){
  xLabels.push(`Day ${i} `)
}



export default function SimpleBarChart(props) {

  const chartSetting = {
    yAxis: [
      {
        label: props.label,
      },
    ],
    sx: {
      [`.${axisClasses.left} .${axisClasses.label}`]: {
        transform: 'translate(-10px, 0)',
      },
      [`.MuiChartsAxis-bottom .MuiChartsAxis-tickContainer .MuiChartsAxis-tickLabel.MuiChartsAxis-tickLabel`]: {
        transform: 'rotate(-19deg)'
      }
    },
  };
  
  const uData = props.data;
  return !!props.data && (
    <BarChart
      height={300}
      series={[
        { data: uData, id: 'pvId' },
      ]}
      xAxis={[{ data: xLabels, scaleType: 'band',categoryGapRatio: 0.8, barGapRatio: 0.5}]}

      slotProps={{
        legend: {
          direction: 'column',
          position: { vertical: 'bottom', horizontal: 'left' },
          padding: 0,
          labelStyle: {
          fontSize: 14,
          fill: '#4E4E4E',
          },
        },
      }}

      // sx={{
      //   [`.MuiChartsAxis-bottom .MuiChartsAxis-tickContainer .MuiChartsAxis-tickLabel.MuiChartsAxis-tickLabel`]: {
      //     transform: 'rotate(-19deg)'
      //   }
      // }}

      {...chartSetting}

    />
  );
}