"use client"
import { useEffect } from 'react';
import * as echarts from 'echarts/core';
import { GridComponent, GridComponentOption } from 'echarts/components';
import { BarChart, BarSeriesOption } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([GridComponent, BarChart, CanvasRenderer]);

type EChartsOption = echarts.ComposeOption<
  GridComponentOption | BarSeriesOption
>;

export default function BarChartComponent() {
  useEffect(() => {
    var chartDom = document.getElementById('barChart');
    if (chartDom) {
      var myChart = echarts.init(chartDom, 'dark');
      var option: EChartsOption;

      option = {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [
              120,
              {
                value: 200,
                itemStyle: {
                  color: '#a90000'
                }
              },
              150,
              80,
              70,
              110,
              130
            ],
            type: 'bar'
          }
        ]
      };

      option && myChart.setOption(option);
    }
  }, []);

  return (
    <div id="barChart" style={{ width: '100%', height: '400px' }}></div>
  );
}
