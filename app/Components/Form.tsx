// components/Form.tsx
"use client"
import React, { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import { getCategory, submitTransaction } from "@/utils/api";
import { validateTransaction } from "@/utils/validation";

const notes = ['Monthly spend', 'Savings', 'Credit Card', 'Debit Card', 'Other'];

const Form = () => {
  const [type, setType] = useState("Expense");
  const [amount, setAmount] = useState(Math.round(Math.random() * 1000));
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [category, setCategory] = useState("Groceries");
  const [description, setDescription] = useState(notes[Math.floor(Math.random() * notes.length)]);
  const [allCategories, setAllCategories] = useState([]);
  const [allowedCategories, setAllowedCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const categories = await getCategory();
      setAllCategories(categories);
      setAllowedCategories(categories.filter((cat: any) => cat.type === type));
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    setAllowedCategories(allCategories.filter((cat: any) => cat.type === type));
  }, [type, allCategories]);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (!validateTransaction(type, amount, date, category, description)) {
      toast.error('Please fill all the fields', { position: "bottom-right", autoClose: 3000, theme: "dark" });
      return;
    }

    const response = await submitTransaction({ type, amount, date, category, description });
    if (response && response.status === 201) {
      toast.success('Transaction recorded', { position: "bottom-right", autoClose: 3000, theme: "dark" });
      setAmount(0);
      setDate(new Date().toISOString().split("T")[0]);
      setCategory("Groceries");
      setDescription("");
    } else {
      toast.error('Failed to record transaction', { position: "bottom-right", autoClose: 3000, theme: "dark" });
    }
  };

  return (
    <form className="flex flex-col gap-3 form-control w-full">
      <div className='flex justify-center items-center gap-4'>
        <label className="form-control w-full max-w-xs md:max-w-md">
          <div className="label">
            <span className="label-text-alt">Transaction type</span>
          </div>
          <select className="select select-bordered w-full max-w-xs md:max-w-md" onChange={(e) => setType(e.target.value)} value={type}>
            <option value="Income">Income</option>
            <option value="Expense">Expense</option>
          </select>
        </label>
      </div>

      <div className='flex justify-center items-center gap-4'>
        <label className="form-control w-full max-w-xs md:max-w-md">
          <div className="label">
            <span className="label-text-alt">Amount</span>
          </div>
          <input type="number" name="amount" value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            placeholder="Amount" className="input input-bordered w-full max-w-xs md:max-w-md" />
        </label>
      </div>

      <div className='flex justify-center items-center gap-4'>
        <label className="form-control w-full max-w-xs md:max-w-md">
          <div className="label">
            <span className="label-text-alt">Transaction Date</span>
          </div>
          <input type="date" name="date" id="transactionDate" value={date} className="input select-bordered w-full max-w-xs md:max-w-md"
            onChange={(e) => setDate(e.target.value)} />
        </label>
      </div>

      <div className='flex justify-center items-center gap-4'>
        <label className="form-control w-full max-w-xs md:max-w-md">
          <div className="label">
            <span className="label-text-alt">Category</span>
          </div>
          <select name="transactionCategory" id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="select select-bordered w-full max-w-xs md:max-w-md">
            {allowedCategories.map((cat: any) => (
              <option value={cat.name} key={cat._id}>{cat.name}</option>
            ))}
          </select>
        </label>
      </div>

      <div className='flex justify-center items-center gap-4'>
        <label className="form-control w-full max-w-xs md:max-w-md">
          <div className="label">
            <span className="label-text-alt">Transaction Note (Optional)</span>
          </div>
          <input name="description" type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Type here" className="input input-bordered w-full max-w-xs md:max-w-md" />
        </label>
      </div>

      <button className=' flex justify-center items-center self-center gap-4 btn btn-primary btn-outline md:max-w-md' type="submit" onClick={(e) => handleSubmit(e)}>Submit</button>

    </form>
  );
};

export default Form;
