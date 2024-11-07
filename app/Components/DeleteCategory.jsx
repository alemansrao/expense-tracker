import { deleteCategory } from '@/utils/api';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Card from "@/app/Components/Card";
import { Trash } from 'react-feather';
import { Button, Select, SelectItem, Skeleton } from '@nextui-org/react';

const DeleteCategory = ({ categories, setTemp }) => {
    // State to keep track of the selected category for deletion
    const [currentCategory, setCurrentCategory] = useState(null);

    // Array of category IDs that should be disabled (Savings, Shopping, Transfer)
    const disabledCategoryIds = categories
        .filter(category => ['Savings', 'Shopping', 'Transfer'].includes(category.name))
        .map(category => category._id);

    // Function to handle the deletion of a category
    const handleDelete = async () => {
        if (currentCategory) {
            // Check if the selected category is in the list of disabled categories
            if (disabledCategoryIds.includes(currentCategory)) {
                toast.error('This category cannot be deleted');
                return;  // Exit the function early if the category is disabled
            }
    
            // Call the API to delete the category
            const response = await deleteCategory(currentCategory);
    
            // Check if the deletion was successful
            if (response && response.ok) {
                toast.success('Category deleted successfully');
                // Reset the selected category and trigger a re-fetch of categories
                setCurrentCategory(null);
                setTemp(prev => !prev);  // Toggle the state to refresh categories
            } else {
                // Handle errors in case of failure
                const errorData = await response.json(); // Parse the error message
                const errorMessage = errorData.error || currentCategory + ' category not deleted';
                toast.error(errorMessage);
            }
        } else {
            // Error if no category is selected
            toast.error('Please select a category to delete');
        }
    }
    

    // Function to render the body of the card (Select input and Skeleton loader)
    const body = () => (
        categories.length > 0 ? (
            <Select
                label="Select category to delete"
                onChange={(e) => setCurrentCategory(e.target.value)}  // Update selected category
                // disabledKeys={disabledCategoryIds}  // Disable categories with specific IDs
            >
                {categories.map((category) => (
                    <SelectItem key={category._id} value={category._id}>
                        {category.name}
                    </SelectItem>
                ))}
            </Select>
        ) : (
            <Skeleton className="flex rounded-xl w-full h-14" />  // Show a loading skeleton if categories are empty
        )
    );

    // Footer content for the card, including the delete button
    const footer = () => (
        <Button variant="bordered" onClick={handleDelete} color='primary'>Delete</Button>
    );

    // Return the Card component with title, body, and footer
    return (
        <Card title="Delete Category" image={<Trash />} body={body()} footer={footer()} />
    );
}

export default DeleteCategory;
