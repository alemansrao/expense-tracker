"use client"
import { React, useState, useEffect } from 'react'
import { getCategory } from '@/utils/api';
// import Card from '../Components/Card'
import { getLimit } from '@/utils/api'
import LimitSetting from '@/app/Components/LimitSetting'
import AddCategory from '@/app/Components/AddCategory'
const page = () => {
  const [temp, setTemp] = useState(true)
  const [allCategories, setAllCategories] = useState([]);
  const [expenseCategory, setExpenseCategory] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const categories = await getCategory();
      // Optionally, you can set all categories if needed
      // setAllCategories(categories);
      setExpenseCategory(categories.filter((cat) => cat.type === 'Expense'));
    };

    fetchCategories();
  }, [temp]); // Will run on component mount and whenever `temp` changes



  return (
    <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 gap-4 p-4">
      <AddCategory setTemp={setTemp}  />
      <LimitSetting expenseCategory={expenseCategory} />
    </div>
  )
}

export default page