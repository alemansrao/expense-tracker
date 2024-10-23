import React, { useEffect, useState } from 'react'

const DeleteCategory = ({ categories }) => {
    const [currentCategory, setCurrentCategory] = useState(null);
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
                            <option key={category._id} value={`${category._id}1212`}>{category.name}</option>
                        ))}
                    </select>
                    <button className='btn btn-primary'>Delete</button>
                </div>

            </div>
        </div>
    )
}

export default DeleteCategory