import { React, useEffect, useState } from 'react';
import { ArrowRight } from 'react-feather';
import { createCategory } from '@/utils/api';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
const AddCategory = (props) => {
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
            username: 'alemansrao', // Hardcoded username for testing
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


    return (
        <form onSubmit={handleSubmit} > {/* Add form tag */}
            <div className="card bg-neutral text-neutral-content w-full">
                <div className="card-body items-center text-center">
                    <h2 className="card-title">{"Add Category"}</h2>

                    <div className='flex flex-row gap-3 items-center w-full justify-around'>
                        <select
                            onChange={(e) => setType(e.target.value)}
                            className='select w-full select-bordered max-w-sm md:max-w-md'
                        >
                            <option value="Expense">Expense</option>
                            <option value="Income">Income</option>
                        </select>
                    </div>

                    <div className='flex flex-row gap-3 items-center w-full justify-around'>
                        <label className="input input-bordered flex items-center gap-2 w-full max-w-sm md:max-w-md">
                            Name
                            <input
                                type="text"
                                className="grow"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </label>
                    </div>

                    <div className='flex flex-row gap-3 items-center w-full justify-around'>
                        <label className="input input-bordered flex items-center gap-2 w-full max-w-sm md:max-w-md">
                            Limit ₹
                            <input
                                type="number"
                                className="grow"
                                value={limit}
                                step={500}
                                onChange={(e) => setLimit(e.target.value)}
                                disabled={type === 'Income'} // Disable if type is Income
                                onKeyDown={(e) => e.key === 'Enter' && handleSubmit(e)}
                            />
                            <ArrowRight
                                className='hover:cursor-pointer bg-primary rounded-lg text-white'
                                type="submit" // Change ArrowRight to submit the form
                                onClick={handleSubmit}
                            />
                        </label>
                    </div>

                    <div className='card-actions justify-end'></div>
                </div>
            </div>
        </form>
    );
}

export default AddCategory;
