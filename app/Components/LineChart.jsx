"use client";
import React, { useEffect, useRef, useState } from "react";
import * as echarts from "echarts/core";
import { TitleComponent, LegendComponent, TooltipComponent, GridComponent } from "echarts/components";
import { LineChart } from "echarts/charts";
import { CanvasRenderer } from "echarts/renderers";
import { fetchYearlyTransactions } from "@/utils/api"; // Adjust path as needed

echarts.use([TitleComponent, LegendComponent, TooltipComponent, GridComponent, LineChart, CanvasRenderer]);

const LineChartComponent = ({ username, allSpendsOfYear }) => {
    const chartRef = useRef(null);
    const [monthlyData, setMonthlyData] = useState([]);

    useEffect(() => {
        const loadMonthlyExpenseData = async () => {
            try {
                // Fetch transactions for the current year based on the provided API
                // const allSpendsOfYear = await fetchYearlyTransactions(username);

                // Initialize an array for 12 months to store monthly expenses
                const expensesPerMonth = Array(12).fill(0);
                console.log("Length of allSpendsOfYear", allSpendsOfYear.length)
                // Format transactions data into monthly expenses
                allSpendsOfYear.forEach(transaction => {
                    if (transaction.type === "Expense") {
                        const transactionMonth = new Date(transaction.date).getMonth();
                        expensesPerMonth[transactionMonth] += transaction.amount;
                    }
                });

                setMonthlyData(expensesPerMonth);
            } catch (error) {
                console.error("Error loading monthly expense data:", error);
            }
        };

        loadMonthlyExpenseData();
    }, [username,allSpendsOfYear]);

    useEffect(() => {
        if (chartRef.current) {
            const existingChart = echarts.getInstanceByDom(chartRef.current);
            if (existingChart) {
                existingChart.dispose();
            }
            const titleText = monthlyData.every(value => value === 0) ? "No Expenses Found" : "Monthly Expenses";
            const myChart = echarts.init(chartRef.current, "dark");

            const option = {
                title: {
                    text: titleText,
                    left: '5%',
                    top: "5%"
                },
                tooltip: {
                    trigger: "axis"
                },
                grid: {
                    top: "20%",
                    bottom: "10%",
                    left: "15%",
                },
                xAxis: {
                    type: "category",
                    data: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
                },
                yAxis: {
                    type: "value",
                    name: "Expense Amount",
                    nameTextStyle: {
                        align: "center"
                    },
                },

                series: [
                    {
                        data: monthlyData,
                        type: "line",
                        smooth: true,
                        name: "Expenses",
                        lineStyle: {
                            width: 2,
                            color: "#5470C6"
                        },
                        itemStyle: {
                            color: "#5470C6"
                        }
                    }
                ]
            };

            myChart.setOption(option);

            return () => {
                myChart.dispose();
            };
        }
    }, [monthlyData]);

    return <div ref={chartRef} style={{ width: "100%", height: "100%" }} />;
};

export default LineChartComponent;
