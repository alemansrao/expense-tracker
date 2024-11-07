"use client"
import React, { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts/core';
import { TitleComponent, LegendComponent } from 'echarts/components';
import { RadarChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import { fetchMonthlyTransactions } from '@/utils/api'; // Adjust the path as needed
import { getCategory } from '@/utils/api'; // Adjust the path as needed

echarts.use([TitleComponent, LegendComponent, RadarChart, CanvasRenderer]);

const RadarChartComponent = ({ username, transactions }) => {
  const chartRef = useRef(null);
  const [chartData, setChartData] = useState({ budget: [], expense: [] });
  const [categories, setCategories] = useState([]);
  const [budgetMap, setBudgetMap] = useState({}); // State for budgetMap

  useEffect(() => {
    const loadTransactionDate = async () => {
      try {
        const fetchedExpenseCategories = await getCategory(username, 'Expense');
        setCategories(fetchedExpenseCategories);
      } catch (error) {
        console.error("Error loading category data for radar chart:", error);
      }
    };

    loadTransactionDate();
  }, [username]);



  useEffect(() => {
    const loadData = async () => {
      try {
        // Store categories in state

        // if (!transactions.length) {
        // console.log("No transactions found");
        //   setChartData({ budget: [], expense: [] });
        //   return; // No transactions, handle this case in the chart
        // }

        const budgetMapTemp = {};
        const expenseMap = {};

        // Map categories with their budget limits
        categories.forEach((category) => {
          budgetMapTemp[category.name] = category.limit;
          expenseMap[category.name] = 0; // Initialize expense tracking
        });
        // console.log(budgetMapTemp)
        // Sum expenses for each category from transactions
        transactions?.forEach((transaction) => {
          expenseMap[transaction.category_id] += transaction.amount;
        });

        const budget = Object.values(budgetMapTemp);
        const expenses = Object.values(expenseMap);
        // console.log(budget, expenses);
        setBudgetMap(budgetMapTemp); // Store budgetMap in state
        setChartData({ budget, expense: expenses });
      } catch (error) {
        console.error("Error loading data for radar chart:", error);
      }
    };

    if (transactions && categories) {
      loadData();
    }
  }, [username, transactions, categories]);

  useEffect(() => {
    if (chartRef.current && categories.length) {
      let existingChart = echarts.getInstanceByDom(chartRef.current);
      if (existingChart) {
        existingChart.dispose();
      }
      const titleText = transactions.length > 0 ? "Budget vs Spending" : "No Transactions Found";
      const myChart = echarts.init(chartRef.current, 'dark');
      const option = {
        title: {
          text: titleText,
          left: '5%',
          top: "2%"
        },
        legend: {
          data: ['Budget', 'Expense'],
          right: "5%",
          bottom: "2%"
        },
        tooltip: {
          trigger: 'item'
        },
        radar: {
          indicator: categories.map(category => ({ name: category.name, max: budgetMap[category.name] || 0 })),
        },
        series: [
          {
            name: 'Budget vs Spending',
            type: 'radar',
            data: [
              { value: chartData.budget, name: 'Budget' },
              { value: chartData.expense, name: 'Expense' },
            ],
          },
        ],
      };

      myChart.setOption(option);

      return () => {
        myChart.dispose();
      };
    }
  }, [chartData, categories, budgetMap]);

  return <div ref={chartRef} style={{ width: '100%', height: '100%' }} />;
};

export default RadarChartComponent;
