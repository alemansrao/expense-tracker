"use client"
import React, { useEffect, useState } from 'react';
import BarChart from './Components/BarChart';
import RadarChartComponent from './Components/RadarChart';
import { signIn, signOut, useSession } from 'next-auth/react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getWeeklyExpenses } from "@/utils/api";
import { Button } from '@nextui-org/react'

type Props = {};

const HomePage = (props: Props) => {
  const { data: session } = useSession();
  const [weeklyExpenses, setWeeklyExpenses] = useState([]);

  useEffect(() => {
    const fetchWeeklyExpenses = async () => {
      const expenses = await getWeeklyExpenses(); // Fetching expenses
      // console.log(expenses); // Log the fetched expenses
      setWeeklyExpenses(expenses); // Set the state with the fetched expenses
    };
    fetchWeeklyExpenses();
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
        <div className='border bg-slate-400 h-96 justify-center items-center flex md:col-span-2 md:row-span-4 col-span-2'>
          <RadarChartComponent />
        </div>
        <div className='divider col-span-2 md:hidden'></div>
        <div className='border bg-slate-400 h-96 justify-center items-center flex md:row-span-4 col-span-2'>
          <BarChart expenses={weeklyExpenses} /> {/* Pass the expenses to BarChart */}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
