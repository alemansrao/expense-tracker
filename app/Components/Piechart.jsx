"use client"
import { useEffect } from 'react';
import * as echarts from 'echarts';
import { GridComponent } from 'echarts/components';
import { BarChart, PieChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import { TooltipComponent } from 'echarts/components';

echarts.use([GridComponent, BarChart, PieChart, CanvasRenderer, TooltipComponent]);

export default function PieChartComponent({ expenses }) {
    useEffect(() => {

        // Group expenses by category and calculate total amounts
        const expenseData = expenses?.reduce((acc, expense) => {
            const { category_id, amount } = expense;
            if (!acc[category_id]) {
                acc[category_id] = 0;
            }
            acc[category_id] += amount;
            return acc;
        }, {});
        // console.log(expenseData)
        // Prepare data in the format ECharts expects
        const chartData = Object.keys(expenseData).map(category => ({
            value: expenseData[category],
            name: category
        }));
        const titleText = expenses.length > 0 ? "Expenses By Category" : "No Transactions Found";
        const chartDom = document.getElementById('pieChart1');
        if (chartDom) {
            const myChart = echarts.init(chartDom, 'dark');
            const option = {
                title: {
                    text: titleText,
                    left: '5%',
                    top: "5%"
                    // subtext: 'Living Expenses in Shenzhen'
                  },
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    bottom: '2%',
                    left: 'center'
                },
                series: [
                    {
                        name: 'Expenses by Category',
                        type: 'pie',
                        radius: ['40%', '70%'],
                        avoidLabelOverlap: false,
                        itemStyle: {
                            borderRadius: 8,
                            borderColor: '#000',
                            borderWidth: 1
                        },
                        label: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            label: {
                                show: true,
                                fontSize: 30,
                                fontWeight: 'bold'
                            }
                        },
                        labelLine: {
                            show: false
                        },
                        data: chartData // Use dynamic data
                    }
                ]
            };

            myChart.setOption(option);

            return () => {
                myChart.dispose();
            };
        }
    }, [expenses]); // Run effect again when expenses change

    return (
        <div id="pieChart1" style={{ width: '100%', height: '100%' }}></div>
    );
}
