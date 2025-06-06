"use client"
import { React, useState, useEffect } from 'react'
import { getCategory } from '@/utils/api';
// import Card from '../Components/Card'
import LimitSetting from '@/app/Components/LimitSetting'
import AddCategory from '@/app/Components/AddCategory'
import DeleteCategory from '@/app/Components/DeleteCategory'
import { signIn, signOut, useSession } from 'next-auth/react';
import { Button } from "@heroui/react";
const Page = () => {
  const { data: session } = useSession();
  const [temp, setTemp] = useState(true)
  const [allCategories, setAllCategories] = useState([]);
  const [expenseCategory, setExpenseCategory] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const categories = await getCategory(`${session?.user?.email}`);
      setExpenseCategory(categories.filter((cat) => cat.type === 'Expense'));
      setAllCategories(categories);
    };
    // console.log(session)
    fetchCategories();
  }, [temp]); // Fetch categories when new category added

  if (!session)
    return <div className='w-full h-screen flex flex-col justify-center items-center'>
      <p>You are not logged in</p>
      <Button color='primary' onClick={() => signIn()} className='m-4'>
        Sign in
      </Button>
    </div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 gap-4 p-4">

      <AddCategory setTemp={setTemp} username={session?.user?.email} />
      <LimitSetting expenseCategory={expenseCategory} username={session?.user?.email} />
      <DeleteCategory categories={allCategories} setTemp={setTemp} username={session?.user?.email} />
    </div>
  )
}

export default Page