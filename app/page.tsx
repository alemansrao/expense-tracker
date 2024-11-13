"use client"
import React, { useEffect, useState } from 'react';
import BarChart from './Components/BarChart';
import RadarChartComponent from './Components/RadarChart';
import Piechart from './Components/Piechart';
import { signIn, signOut, useSession } from 'next-auth/react';
import 'react-toastify/dist/ReactToastify.css';
import { getWeeklyExpenses, fetchMonthlyTransactions } from "@/utils/api";
import { Button, Skeleton } from '@nextui-org/react'
import LineChart from './Components/LineChart';
import BudgetUtilizationChart from './Components/BudgetUtilizationChart';
import { fetchYearlyTransactions } from '@/utils/api';
type Props = {};

const HomePage = (props: Props) => {
  const { data: session } = useSession();
  const [weeklyExpenses, setWeeklyExpenses] = useState([]);
  const [monthlyExpenses, setMonthlyExpenses] = useState([]);
  const [yearlyExpenses, setYearlyExpenses] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (session) { // Run only when session is available
      const fetchWeeklyExpenses = async () => {
        setLoading(false);  // Set loading to true before fetching data
        const expenses = await getWeeklyExpenses(`${session.user?.email}`);
        console.log("got weekly expenses", expenses)
        setWeeklyExpenses(expenses);
      };

      const fetchMonthlyExpenses = async () => {
        const expenses = await fetchMonthlyTransactions(`${session.user?.email}`);
        setMonthlyExpenses(expenses);
        console.log("got monthly expenses", expenses)
      };
      const fetchYearlyExpenses = async () => {
        const expenses = await fetchYearlyTransactions(`${session.user?.email}`);
        setYearlyExpenses(expenses);
        console.log("got yearly expenses", expenses)
        setLoading(false);  // Set loading to false once data is fetched
      }
      if (weeklyExpenses.length === 0) {
        console.log("Fetching weekly expenses");
        fetchWeeklyExpenses();
      }
      if (monthlyExpenses.length === 0) {
        console.log("Fetching monthly expenses");
        fetchMonthlyExpenses();
      }
      if (yearlyExpenses.length === 0) {
        console.log("Fetching yearly expenses");
        fetchYearlyExpenses();
      }
    }
  }, []);

  if (!session)
    return <div className='w-full h-screen flex flex-col justify-center items-center'>
      <p>You are not logged in</p>
      <Button color='primary' onClick={() => signIn()} className='m-4'>
        Sign in
      </Button>
    </div>;

  return (
    <div>
      {session &&
        <div className='text-2xl text-center py-3 px-2'>
          Hi <span className='text-primary'>{session?.user?.name}</span>, Welcome to Expense Tracker
        </div>
      }
      <div className="grid grid-cols-2 md:grid-cols-4 text-white gap-2 p-3">


        <div className='border bg-[#100c2a] h-96 justify-center items-center flex md:row-span-4 col-span-2'>
          {loading ? (
            <Skeleton className="rounded-lg h-full w-full">
              <div className="rounded-lg bg-default-300"></div>
            </Skeleton>
          ) : (
            <BarChart expenses={weeklyExpenses} />
          )}
        </div>
        <div className='divider col-span-2 md:hidden'></div>
        <div className='border bg-[#100c2a] h-96 justify-center items-center flex md:row-span-4 col-span-2'>
          {loading ? (
            <Skeleton className="rounded-lg h-full w-full">
              <div className="rounded-lg bg-default-300"></div>
            </Skeleton>
          ) : (
            <Piechart expenses={monthlyExpenses} />
          )}
        </div>
        <div className='divider col-span-2 md:hidden'></div>
        <div className='border bg-[#100c2a] h-96 justify-center items-center flex md:col-span-2 md:row-span-4 col-span-2'>
          {loading ? (
            <Skeleton className="rounded-lg h-full w-full">
              <div className="rounded-lg bg-default-300"></div>
            </Skeleton>
          ) : (
            <RadarChartComponent username={`${session?.user?.email}`} transactions={monthlyExpenses} />
          )}
        </div>
        <div className='divider col-span-2 md:hidden'></div>
        <div className='border bg-[#100c2a] h-96 justify-center items-center flex md:col-span-2 md:row-span-4 col-span-2'>
          {loading ? (
            <Skeleton className="rounded-lg h-full w-full">
              <div className="rounded-lg bg-default-300"></div>
            </Skeleton>
          ) : (
            <LineChart username={`${session?.user?.email}`} allSpendsOfYear={yearlyExpenses} />
          )}
        </div>
        <div className='divider col-span-2 md:hidden'></div>
        <div className='border bg-[#100c2a] h-96 justify-center items-center flex md:col-span-2 md:row-span-4 col-span-2'>
          {loading ? (
            <Skeleton className="rounded-lg h-full w-full">
              <div className="rounded-lg bg-default-300"></div>
            </Skeleton>
          ) : (
            <BudgetUtilizationChart username={`${session?.user?.email}`} />
          )}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
