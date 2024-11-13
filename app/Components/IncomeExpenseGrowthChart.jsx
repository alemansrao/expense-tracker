"use client";
import React, { useEffect, useRef, useState } from "react";
import * as echarts from "echarts/core";
import { TitleComponent, TooltipComponent, GridComponent } from "echarts/components";
import { LineChart } from "echarts/charts";
import { CanvasRenderer } from "echarts/renderers";
import { fetchYearlyTransactions } from "@/utils/api"; // Adjust the path as needed

echarts.use([TitleComponent, TooltipComponent, GridComponent, LineChart, CanvasRenderer]);

const IncomeExpenseGrowthChart = ({ username,allTransactions }) => {
  const chartRef = useRef(null);
  const [transactions, setTransactions] = useState([]);
  const [growthData, setGrowthData] = useState({
    income: Array(12).fill(0), // Initialize each month with 0
    expense: Array(12).fill(0), // Initialize each month with 0
  });

  // Fetch transactions for the year

  // Process the data to calculate cumulative growth for income and expenses
  useEffect(() => {
    const calculateCumulativeGrowth = () => {
      let cumulativeIncome = 0;
      let cumulativeExpense = 0;
      let incomeData = Array(12).fill(0);
      let expenseData = Array(12).fill(0);

      // Group transactions by month
      allTransactions.forEach((transaction) => {
        const month = new Date(transaction.date).getMonth(); // Get month (0-11)

        if (transaction.type === "Income") {
          incomeData[month] += transaction.amount;
        } else {
          expenseData[month] += transaction.amount;
        }
      });
      console.log(incomeData);
      console.log(expenseData);
      // Convert monthly data to cumulative growth
      for (let i = 0; i < 12; i++) {
        cumulativeIncome += incomeData[i];
        cumulativeExpense += expenseData[i];
        incomeData[i] = cumulativeIncome;
        expenseData[i] = cumulativeExpense;
      }

      setGrowthData({ income: incomeData, expense: expenseData });
    };

    if (allTransactions.length > 0) {
      calculateCumulativeGrowth();
    }
  }, [allTransactions]);

  // Set up the chart
  useEffect(() => {
    if (chartRef.current) {
      let existingChart = echarts.getInstanceByDom(chartRef.current);
      if (existingChart) {
        existingChart.dispose();
      }

      const myChart = echarts.init(chartRef.current, "dark");
      const titleText = allTransactions.length > 0 ? "Income/Expenses Growth" : "No Transactions Found";
      const option = {
        title: {
          text: titleText,
          left: '5%',
          top: "5%"
          // subtext: 'Living Expenses in Shenzhen'
        },
        tooltip: {
          trigger: "axis",
          formatter: (params) => {
            const [income, expense] = params;
            return `
              <strong>${income.name}</strong><br />
              Income: ${income.value} <br />
              Expense: ${expense.value}
            `;
          },
        },
        xAxis: {
          type: "category",
          data: [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
          ],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: growthData.income,
            type: 'line',
            smooth: true,
            itemStyle:{
              color:"#7cffb2",
            },
          },
          {
            data: growthData.expense,
            type: 'line',
            smooth: true,
            itemStyle:{
              color:"#4992ff",
            },
          }
        ]
      };

      myChart.setOption(option);

      return () => {
        myChart.dispose();
      };
    }
  }, [growthData]);

  return <div ref={chartRef} style={{ width: "100%", height: "100%" }} />;
};

export default IncomeExpenseGrowthChart;
