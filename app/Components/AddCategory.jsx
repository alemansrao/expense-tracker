import { React, useEffect, useState } from 'react';
import { ArrowRight, ShoppingBag } from 'react-feather';
import { createCategory } from '@/utils/api';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Card from '@/app/Components/Card';
import { Divider } from "@heroui/react";
import { Input, Select, SelectItem, Button } from "@heroui/react";

const AddCategory = (props) => {
    const animals = [
        { key: "Income", label: "Income" },
        { key: "Expense", label: "Expense" },
    ]
    const [type, setType] = useState('Expense');
    const [name, setName] = useState('');
    const [limit, setLimit] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
        if (!name) return toast.error('Please name the category');

        if (type === 'Expense') {
            // For Expense type, check limit-related conditions
            if (!limit) {
                return toast.error('Please enter a limit');
            } else if (limit < 500) {
                return toast.error('Limit should be greater than ₹500');
            }
        } else if (type === 'Income') {
            // For Income type, check limit-related conditions
            if (limit) {
                return toast.error('Income cannot have a limit 😉');
            } else if (limit > 500000) {
                return toast.error('Limit should be less than ₹500,000');
            }
        }



        // Prepare the category data
        const categoryData = {
            name,
            type,
            username: props.username, // Hardcoded username for testing
            limit: type === 'Income' ? null : limit
        };

        // Call the createCategory function
        const response = await createCategory(categoryData);

        // Check if the response is OK
        if (response && response.ok) {
            // Optionally, handle success (e.g., reset the form or show a success message)
            toast.success(name + ' category created');
            // Reset fields
            setName('');
            setLimit('');
            props.setTemp(prev => !prev)
        } else {
            // Handle errors
            const errorData = await response.json(); // Parse the JSON response to get the error message
            const errorMessage = errorData.error || name + ' category not created'; // Default to a generic error message

            // Check for duplicate category error
            if (errorMessage.includes("Category with the same type and name already exists for this user.")) {
                toast.error("This category already exists");
            } else {
                toast.error(errorMessage); // Show the specific error message
            }
        }
    };

    const cardBody = () => (
        <form onSubmit={handleSubmit} >
            <Select
                label="Select type of Category"
                onChange={(e) => setType(e.target.value)}>
                {animals.map((animal) => (
                    <SelectItem key={animal.key} className="dark">
                        {animal.label}
                    </SelectItem>
                ))}
            </Select>
            <div className='h-2'></div>
            <Input type="text" label="Category name" value={name} onChange={(e) => setName(e.target.value)} />
            <div className='h-2'></div>
            <Input type="number" label="Expense Limit" isDisabled={type === 'Income'} step={1000} value={limit} onChange={(e) => setLimit(e.target.value)} />
        </form>
    )
    const footer = () => (
        <Button variant="bordered" color="primary" className="" onClick={handleSubmit} onTouchEnd={(e) => {handleSubmit(e);console.log("touch ended")}}>  Add </Button>
    )

    return (
        <Card title={"Add Category"} image={<ShoppingBag/>} body={cardBody()} footer={footer()}></Card>
    );
}

export default AddCategory;
