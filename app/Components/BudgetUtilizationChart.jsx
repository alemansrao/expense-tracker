"use client";
import React, { useEffect, useRef, useState } from "react";
import * as echarts from "echarts/core";
import { TitleComponent, TooltipComponent, GridComponent } from "echarts/components";
import { BarChart } from "echarts/charts";
import { CanvasRenderer } from "echarts/renderers";
import { fetchMonthlyTransactions } from "@/utils/api"; // Adjust the path as needed
import { getCategory } from "@/utils/api"; // Adjust the path as needed

echarts.use([TitleComponent, TooltipComponent, GridComponent, BarChart, CanvasRenderer]);

const BudgetUtilizationChart = ({ username }) => {
  const chartRef = useRef(null);
  const [categories, setCategories] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [utilizationData, setUtilizationData] = useState({});

  // Fetch Categories and Transactions
  useEffect(() => {
    const loadCategoryAndTransactionData = async () => {
      try {
        // Fetch the categories for the user
        const fetchedCategories = await getCategory(username, "Expense");
        setCategories(fetchedCategories);

        // Fetch the transactions for the current month
        const fetchedTransactions = await fetchMonthlyTransactions(username);
        setTransactions(fetchedTransactions);
      } catch (error) {
        console.error("Error fetching data for Budget Utilization chart:", error);
      }
    };

    loadCategoryAndTransactionData();
  }, [username]);

  // Process the data to calculate budget utilization per category
  useEffect(() => {
    const calculateUtilization = () => {
      const utilizationMap = {};

      categories.forEach((category) => {
        const categoryTransactions = transactions.filter(
          (transaction) => transaction.category_id === category.name
        );

        const totalSpent = categoryTransactions.reduce(
          (sum, transaction) => sum + transaction.amount,
          0
        );
        const utilizationPercentage = (totalSpent / (category.limit || 1)) * 100; // Avoid division by zero

        utilizationMap[category.name] = utilizationPercentage;
      });

      setUtilizationData(utilizationMap);
    };

    if (categories.length > 0 && transactions.length > 0) {
      calculateUtilization();
    }
  }, [categories, transactions]);

  // Set up the chart
  useEffect(() => {
    if (chartRef.current) {
      let existingChart = echarts.getInstanceByDom(chartRef.current);
      if (existingChart) {
        existingChart.dispose();
      }

      const myChart = echarts.init(chartRef.current, "dark");

      // Prepare the chart data
      const categoryNames = Object.keys(utilizationData);
      const utilizationValues = categoryNames.map((category) => utilizationData[category]);
      function getColorByUtilization(utilization) {
        if (utilization <= 20) {
          return "#00b140"; // Green for 0-20%
        } else if (utilization <= 40) {
          return "#66cc33"; // Lighter green for 20-40%
        } else if (utilization <= 60) {
          return "#ffcc00"; // Yellowish for 40-60% (mix of green and red)
        } else if (utilization <= 80) {
          return "#ff6600"; // More reddish for 60-80%
        } else {
          return "#a90000"; // Red for 80-100%
        }
      }
      const option = {
        title: {
          text: "Budget Utilization per Category",
          left: "center",
        },
        tooltip: {
          trigger: "item",
          formatter: "{b}: {c}%",
        },
        xAxis: {
          type: "category",
          data: categoryNames,
          axisLabel: {
            rotate: 45, // To avoid text overlap
          },
        },
        yAxis: {
          type: "value",
          max: 100, // Max 100% for utilization
        },
        series: [
          {
            name: "Utilization",
            type: "bar",
            data: utilizationValues.map((utilization, index) => ({
              value: utilization,
              itemStyle: {
                color: getColorByUtilization(utilization),
              },
            })),
          },
        ],
      };

      myChart.setOption(option);

      return () => {
        myChart.dispose();
      };
    }
  }, [utilizationData]);

  return <div ref={chartRef} style={{ width: "100%", height: "100%" }} />;
};

export default BudgetUtilizationChart;
