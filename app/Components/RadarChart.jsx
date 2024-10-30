"use client"
import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts/core';
import { TitleComponent, LegendComponent } from 'echarts/components';
import { RadarChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import { title } from 'process';

echarts.use([TitleComponent, LegendComponent, RadarChart, CanvasRenderer]);

const RadarChartComponent = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      // Dispose of the chart instance if it already exists
      let existingChart = echarts.getInstanceByDom(chartRef.current);
      if (existingChart) {
        existingChart.dispose();
      }

      const myChart = echarts.init(chartRef.current, 'dark');
      const option = {
        title: {
          text: 'Budget vs spending',
          left: '5%',
          top: "2%"
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          top: '5%',
          containLabel: true
        },
        legend: {
          data: ['Budget', 'Expense'],
          right: "5%",
          bottom: "2%"
        },
        radar: {
          nameGap: 4,
          indicator: [
            { name: 'Groceries', max: 6500 },
            { name: 'Rent', max: 16000 },
            { name: 'Travel', max: 30000 },
            { name: 'Investment', max: 38000 },
            { name: 'Food', max: 52000 },
            { name: 'Entertainment', max: 25000 },
          ],
        },
        series: [
          {
            name: 'Budget vs spending',
            type: 'radar',
            data: [
              { value: [4200, 3000, 20000, 35000, 50000, 18000], name: 'Budget' },
              { value: [5000, 14000, 28000, 26000, 42000, 21000], name: 'Expense' },
            ],
          },
        ],
      };

      myChart.setOption(option);

      // Cleanup on unmount
      return () => {
        myChart.dispose();
      };
    }
  }, []);


  return <div ref={chartRef} style={{ width: '100%', height: '100%' }} />;
};

export default RadarChartComponent;
