"use client";
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
  const [budgetMap, setBudgetMap] = useState({});

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
        const budgetMapTemp = {};
        const expenseMap = {};

        categories.forEach((category) => {
          budgetMapTemp[category.name] = category.limit || 0;
          expenseMap[category.name] = 0;
        });

        transactions?.forEach((transaction) => {
          expenseMap[transaction.category_id] += transaction.amount;
        });

        const budget = Object.values(budgetMapTemp);
        const expenses = Object.values(expenseMap);

        setBudgetMap(budgetMapTemp);
        setChartData({ budget, expense: expenses });
      } catch (error) {
        console.error("Error loading data for radar chart:", error);
      }
    };

    if (transactions && categories.length > 0) {
      loadData();
    }
  }, [username, transactions, categories]);

  useEffect(() => {
    if (chartRef.current) {
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
          top: "5%"
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
          indicator: categories.length > 0 ? categories.map(category => ({ name: category.name, max: budgetMap[category.name] || 0 })) : [{ name: 'No Data', max: 1 }],
        },
        series: [
          {
            name: 'Budget vs Spending',
            type: 'radar',
            data: transactions.length > 0 ? [
              { value: chartData.budget, name: 'Budget' },
              { value: chartData.expense, name: 'Expense' },
            ] : [
              { value: [], name: 'Budget' },
              { value: [], name: 'Expense' }
            ],
          },
        ],
      };

      myChart.setOption(option);

      return () => {
        myChart.dispose();
      };
    }
  }, [chartData, categories, budgetMap, transactions]);

  return <div ref={chartRef} style={{ width: '100%', height: '100%' }} />;
};

export default RadarChartComponent;
