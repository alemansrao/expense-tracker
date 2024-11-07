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

type BarChartProps = {
  expenses: Array<{ amount: number; date: string }>; // Adjust the type based on your transaction structure
};

export default function BarChartComponent({ expenses }: BarChartProps) {
  useEffect(() => {
    const chartDom = document.getElementById('barChart');
    if (chartDom) {
      // Dispose of any existing chart instance
      let existingChart = echarts.getInstanceByDom(chartDom);
      if (existingChart) {
        existingChart.dispose();
      }

      const myChart = echarts.init(chartDom, 'dark');

      // Prepare data for the chart
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const expenseData = Array(7).fill(0); // Initialize expense data for each day

      expenses.forEach(transaction => {
        const transactionDate = new Date(transaction.date);
        const dayOfWeek = transactionDate.getDay(); // Get the day (0-Sun, 1-Mon, ..., 6-Sat)
        expenseData[dayOfWeek] += transaction.amount; // Directly add amount to corresponding day
      });
      const titleText = expenses.length > 0 ? "Weekly Expenses" : "No Transactions Found";

      const option: EChartsOption = {
        title: {
          text: titleText,
          left: '5%',
          top: "5%"
          // subtext: 'Living Expenses in Shenzhen'
        },
        tooltip: {
          trigger: 'item'
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          top: '15%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: days,
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            data: expenseData,
            type: 'bar',
          },
        ],
      };

      myChart.setOption(option);

      return () => {
        myChart.dispose();
      };
    }
  }, [expenses]); // Run effect again when expenses change

  return (
    <div id="barChart" style={{ width: '100%', height: '100%'}}></div>
  );
}
