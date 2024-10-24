"use client"
import React from 'react';
import BarChart from './Components/BarChart';
import RadarChartComponent from './Components/RadarChart';
import { signIn, signOut, useSession } from 'next-auth/react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type Props = {};

const HomePage = (props: Props) => {
  const { data: session } = useSession();

  const handleToast = () => {
    if (session) {
      const { user } = session;
      const userInfo = user?.image ? `${user.name} (${user.email} ${user?.image}) - Image Available`
        : `${user?.name} (${user?.email}) - No Image`;

      toast.success(userInfo);
    } else {
      toast.error("You are not logged in.");
    }
  };

  return (
    <div>
      {session ? (
        <div>
          <h1 className="text-white">Welcome {session.user?.name}</h1>
          <button className='btn btn-primary' onClick={() => signOut()}>Sign out</button>
          <button className='btn btn-primary' onClick={handleToast}>Show Info</button>
        </div>
      ) : (
        <div>
          <button className='btn btn-primary' onClick={() => signIn()}>Sign in</button>
          <button className='btn btn-primary' onClick={handleToast}>Show Info</button>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 text-white gap-2 p-3">
        <div className='border bg-slate-400 h-96 justify-center items-center flex md:col-span-2 md:row-span-4 col-span-2'>
          <RadarChartComponent />
        </div>
        <div className='divider col-span-2 md:hidden'></div>
        <div className='border bg-slate-400 h-96 justify-center items-center flex md:row-span-4 col-span-2'>
          <BarChart />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
