"use client"
import React from 'react'
import BarChart from './Components/BarChart'
import RadarChartComponent from './Components/RadarChart'
type Props = {}


const HomePage = (props: Props) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 text-white  gap-2 p-3">
      {/* <div className=' rounded-md bg-[#1d2742] h-12 justify-center items-center flex col-span-2'>
        <div className='w-1/5 justify-center items-center flex  h-full rounded-lg bg-blue-950'>
          <DollarSign size={50} color='red' />
        </div>
        <div className='w-4/5 justify-center items-center flex text-center h-full rounded-lg '>
          <h1 className='text-2xl'>Total Expense : {"12000"}</h1>
        </div>
      </div>









      <div className=' rounded-md bg-[#1d2742] h-12 justify-center col-span-2 items-center flex :hover:pointer'>
        <div className='w-1/5 justify-center items-center flex  h-full rounded-lg bg-blue-950'>
          <DollarSign size={50} color='Green' />
        </div>
        <div className='w-4/5 justify-center items-center flex text-center h-full rounded-lg '>
          <h1 className='text-2xl'>Total Expense : {"12000"}</h1>
        </div>
      </div>
      <div className=' rounded-md bg-[#1d2742] h-12 justify-center items-center flex :hover:pointer col-span-2'>
        <div className='w-1/5 justify-center items-center flex  h-full rounded-lg bg-blue-950'>
          <DollarSign size={50} color='Blue' />
        </div>
        <div className='w-4/5 justify-center items-center flex text-center h-full rounded-lg '>
          <h1 className='text-2xl'>Total Expense : {"12000"}</h1>
        </div>
      </div>
      <div className=' rounded-md bg-[#1d2742] h-12 justify-center items-center flex :hover:pointer col-span-2'>
        <div className='w-1/5 justify-center items-center flex  h-full rounded-lg bg-blue-950'>
          <DollarSign size={50} color='Yellow' />
        </div>
        <div className='w-4/5 justify-center items-center flex text-center h-full rounded-lg '>
          <h1 className='text-2xl'>Total Expense : {"12000"}</h1>
        </div>
      </div>
      */}

      <div className='border bg-slate-400  h-96 justify-center items-center flex md:col-span-2 md:row-span-4 col-span-2'>
        <RadarChartComponent/>
      </div>
      <div className='divider col-span-2 md:hidden'></div>
      <div className='border bg-slate-400 h-96 justify-center items-center flex md:row-span-4 col-span-2'>
        <BarChart/>{/* 4 */}
      </div>
      
    </div>
  )
}

export default HomePage