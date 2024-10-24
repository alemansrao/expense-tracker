import { deleteCategory } from '@/utils/api';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
const DeleteCategory = ({ categories, setTemp }) => {
    const [currentCategory, setCurrentCategory] = useState(null);
    const handleDelete = async () => {

        if (currentCategory) {
            const response = await deleteCategory(currentCategory);

            // Check if the response is OK
            if (response && response.ok) {
                // Optionally, handle success (e.g., reset the form or show a success message)
                toast.success('Category deleted successfully');
                // Reset fields
                setCurrentCategory(null);
                setTemp(prev => !prev)
            } else {
                // Handle errors
                const errorData = await response.json(); // Parse the JSON response to get the error message
                const errorMessage = errorData.error || currentCategory + ' category not deleted'; // Default to a generic error message

                toast.error(errorMessage);
            }
            setTemp(prev => !prev)
        }
        else {
            toast.error('Please select a category to delete');
        }
    }
    useEffect(() => {
        console.log("categories changed")
    }, [categories])

    return (
        <div className="card bg-neutral text-neutral-content w-full">
            <div className="card-body items-center text-center justify-evenly">
                <h2 className="card-title">Delete Category</h2>

                {/* Category Selection */}
                <div className='flex flex-col gap-3 items-center w-full justify-between'>
                    <select className='select w-full select-bordered max-w-sm md:max-w-md'
                        defaultValue={'dummy'}
                        onChange={(e) => setCurrentCategory(e.target.value)}
                    >
                        <option disabled value='dummy'>Select a Category to delete</option>
                        {categories.map((category) => (
                            <option key={category._id} value={`${category._id}`}>{category.name}</option>
                        ))}
                    </select>
                    <button className='btn btn-primary'
                        onClick={() => handleDelete()}
                    >Delete</button>
                </div>

            </div>
        </div>
    )
}

export default DeleteCategory