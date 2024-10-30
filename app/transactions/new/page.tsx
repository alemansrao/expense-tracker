"use client"
import React, { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { getCategory } from '@/utils/api';
import { validateTransaction } from '@/utils/validation';
import { submitTransaction } from '@/utils/api';
import { Button, Input, Select, SelectItem, Textarea, DateInput, DatePicker } from "@nextui-org/react";
import { DateValue, now, getLocalTimeZone } from "@internationalized/date";
import { useDateFormatter } from "@react-aria/i18n";
import { signIn, signOut, useSession } from 'next-auth/react';
type Props = {}

type Category = {
    name: string;
    type: string; // Adjust this based on your data structure
    username: string;
    _id: string;
};
const notes = ['Monthly spend', 'Savings', 'Credit Card', 'Debit Card', 'Other'];

const Page = (props: Props) => {
    const { data: session } = useSession();
    if (!session)
        return <div className='w-full h-screen flex flex-col justify-center items-center'>
            <p>You are not logged in</p>
            <Button color='primary' onClick={() => signIn()} className='m-4'>
                Sign in
            </Button>
        </div>;
    const [type, setType] = useState("Expense");
    const [amount, setAmount] = useState(0);
    const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
    // const [date, setDate] = useState<DateValue>(now(getLocalTimeZone()));
    const formatter = useDateFormatter({
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
    });
    const [category, setCategory] = useState("");
    const [username, setUsername] = useState("alemansrao");
    const [description, setDescription] = useState(notes[Math.floor(Math.random() * notes.length)]);

    const [allCategories, setAllCategories] = useState([]); // Store all categories (both Income and Expense)
    const [allowedCategories, setAllowedCategories] = useState<Category[]>([]); // Initialize as an empty array // Store filtered categories based on type

    const validateData = () => {
        return type && amount > 0 && date && category && description;
    };
    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        if (!category) {
            console.log("Please select a category");
        }
        if (!validateTransaction(type, amount, date, category, description)) {
            toast.error('Please fill all the fields', { position: "bottom-right", autoClose: 3000, theme: "dark" });
            return;
        }

        const response = await submitTransaction({ type, amount, date, category, description, username });
        if (response && response.status === 201) {
            toast.success('Transaction recorded', { position: "bottom-right", autoClose: 3000, theme: "dark" });
            setAmount(0);
            // setDate(new Date().toISOString().split("T")[0]);
            setDescription("");
        } else {
            toast.error('Failed to record transaction', { position: "bottom-right", autoClose: 3000, theme: "dark" });
        }
    };



    useEffect(() => {
        setAmount(Math.round(Math.random() * 1000));
        const fetchCategories = async () => {
            const categories = await getCategory();
            setAllCategories(categories);
            setAllowedCategories(categories.filter((cat: any) => cat.type === type));
        };

        fetchCategories();
    }, []);

    useEffect(() => {
        if (allowedCategories.length > 0) {
            console.log(allowedCategories);
            setCategory(allowedCategories[0].name); // Safely access the first category
        }
    }, [allowedCategories]);


    useEffect(() => {
        // Filter categories based on type without making an API call
        setAllowedCategories(allCategories.filter((cat: any) => cat.type === type));
    }, [type, allCategories]);

    return (
        <div className='md:flex md:flex-row md:gap-5 md:h-[calc(100vh-4rem)] bg-black '>
            <div className='md:w-1/2 justify-center items-center h-full hidden md:flex'>
                <img src="https://cdn-icons-png.flaticon.com/512/7601/7601286.png" alt="" className='grayscale' />
            </div>

            <div className='md:w-1/2 flex justify-center items-center h-full'>
                <form className='flex flex-col gap-3 form-control w-full'>
                    <div className='flex justify-center items-center gap-4'>
                        <Select
                            value={type}
                            label="Transaction type"
                            defaultSelectedKeys={["Expense"]}
                            onChange={(e) => setType(e.target.value)}
                            className="w-full max-w-xs md:max-w-md"
                        >
                            <SelectItem key={"Expense"} value="Expense">Expense</SelectItem>
                            <SelectItem key={"Income"} value="Income">Income</SelectItem>
                        </Select>
                    </div>

                    <div className='flex justify-center items-center gap-4'>
                        <Input type='number' label="Amount" value={amount.toString()} onChange={(e) => setAmount(parseInt(e.target.value))} className='w-full max-w-xs md:max-w-md' />
                    </div>

                    <div className='flex justify-center items-center gap-4'>
                        <Input className='w-full max-w-xs md:max-w-md' label="Transaction Date" type='date' value={date} onChange={(e) => setDate(e.target.value)} />
                    </div>


                    <div className='flex justify-center items-center gap-4'>
                        <Select
                            value={type}
                            label="Transaction category"
                            selectedKeys={[category]}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full max-w-xs md:max-w-md"
                        >
                            {allowedCategories.map((cat: any) => (
                                <SelectItem key={cat.name} value={cat.name}>{cat.name}</SelectItem>
                            ))}
                        </Select>
                    </div>

                    <div className='flex justify-center items-center gap-4'>
                        <Textarea
                            maxLength={150}

                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Enter description"
                            className="textarea textarea-bordered w-full max-w-xs md:max-w-md"
                        />
                    </div>

                    <button className=' flex justify-center items-center self-center gap-4 btn btn-primary btn-outline md:max-w-md' type="submit" onClick={(e) => handleSubmit(e)}>Submit</button>
                </form>
            </div>
        </div>
    );
};

export default Page;



