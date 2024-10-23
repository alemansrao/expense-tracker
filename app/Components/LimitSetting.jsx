import { React, useEffect, useState } from 'react';
import { ArrowRight } from 'react-feather';
import { getLimit, updateLimit } from '@/utils/api';
import { toast } from 'react-toastify';

const LimitSetting = ({ expenseCategory }) => {
    const Currentusername = 'alemansrao'; // Hardcoded username
    const [currentCategory, setCurrentCategory] = useState(''); // State for current category
    const [limit, setLimit] = useState(''); // State for limit
    const [initialLimit, setInitialLimit] = useState(''); // Store initial fetched limit

    // Fetch limit for the selected category
    const fetchLimit = async (category) => {
        const fetchedLimit = await getLimit(Currentusername, category);
        setLimit(fetchedLimit.category.limit); // Update limit state
        setInitialLimit(fetchedLimit); // Update initial limit for comparison
    };

    // Set initial category and fetch limit on mount or when expenseCategory changes
    useEffect(() => {
        if (expenseCategory.length > 0) {
            const initialCategory = expenseCategory[0].name;
            setCurrentCategory(initialCategory);
            fetchLimit(initialCategory);
        }
    }, [expenseCategory]);

    // Fetch limit when the current category changes
    useEffect(() => {
        if (currentCategory) {
            fetchLimit(currentCategory);
        }
    }, [currentCategory]);

    // Handle category selection change
    const handleCategoryChange = (e) => {
        setCurrentCategory(e.target.value);
    };

    // Handle limit submission
    const handleSubmit = async (limit, category) => {
        const id = expenseCategory.find((cat) => cat.name === category)._id;
        const response = await updateLimit({ limit, id });

        if (response.ok) {
            toast.success(`Limit for ${category} updated`);
            setInitialLimit(limit); // Update initial limit after successful update
        } else {
            const errorData = await response.json();
            toast.error(errorData.error || 'An error occurred');
        }
    };

    // Handle the right arrow click to submit the form
    const handleRightArrowClick = () => {
        if (limit === initialLimit) {
            toast.info('No changes made to the limit.');
        } else if (limit < 500) {
            toast.error('Limit should be greater than ₹500.');
        } else if (limit > 500000) {
            toast.error('Limit should be less than ₹500,000.');
        } else {
            handleSubmit(limit, currentCategory);
        }
    };

    return (
        <div className="card bg-neutral text-neutral-content w-full">
            <div className="card-body items-center text-center">
                <h2 className="card-title">Set Limit</h2>

                {/* Category Selection */}
                <div className='flex flex-row gap-3 items-center w-full justify-around'>
                    {expenseCategory && expenseCategory.length > 0 ? (
                        <select
                            value={currentCategory}
                            onChange={handleCategoryChange}
                            className='select w-full select-bordered max-w-sm md:max-w-md'
                        >
                            {expenseCategory.map((cat) => (
                                <option key={cat._id} value={cat.name}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                    ) : (
                        <div className="skeleton w-full input"></div> // Loading skeleton for category
                    )}
                </div>

                {/* Limit Input */}
                <div className='flex flex-row gap-3 items-center w-full justify-around'>
                    {limit ? (
                        <label className="input input-bordered flex items-center gap-2 w-full max-w-sm md:max-w-md">
                            ₹
                            <input
                                type="number"
                                className="grow"
                                step={1000}
                                min={500}
                                value={limit}
                                onChange={(e) => setLimit(e.target.value)} // Update limit value
                            />
                            <ArrowRight
                                className='hover:cursor-pointer bg-primary rounded-lg text-white'
                                onClick={handleRightArrowClick} // Trigger limit submission
                            />
                        </label>
                    ) : (
                        <div className="skeleton w-full input"></div> // Loading skeleton for input
                    )}
                </div>
            </div>
        </div>
    );
};

export default LimitSetting;
