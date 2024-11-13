import { deleteCategory } from '@/utils/api';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import Card from "@/app/Components/Card";
import { Trash } from 'react-feather';
import { Button, Select, SelectItem, Skeleton } from '@nextui-org/react';

const DeleteCategory = ({ categories, setTemp }) => {
    const [currentCategory, setCurrentCategory] = useState(null);
    const [loading, setLoading] = useState(false); // New loading state

    const disabledCategoryIds = categories
        .filter(category => ['Food', 'Shopping', 'Transfer'].includes(category.name))
        .map(category => category._id);

    const handleDelete = async () => {
        if (currentCategory) {
            if (disabledCategoryIds.includes(currentCategory)) {
                toast.error('This category cannot be deleted');
                return;
            }

            setLoading(true); // Disable button

            const response = await deleteCategory(currentCategory);

            if (response && response.ok) {
                toast.success('Category deleted successfully');
                setCurrentCategory(null);
                setTemp(prev => !prev);
            } else {
                const errorData = await response.json();
                const errorMessage = errorData.error || `${currentCategory} category not deleted`;
                toast.error(errorMessage);
            }

            setLoading(false); // Enable button after response
        } else {
            toast.error('Please select a category to delete');
        }
    };

    const body = () => (
        categories.length > 0 ? (
            <Select
                label="Select category to delete"
                onChange={(e) => setCurrentCategory(e.target.value)}
            >
                {categories.map((category) => (
                    <SelectItem key={category._id} value={category._id}>
                        {category.name}
                    </SelectItem>
                ))}
            </Select>
        ) : (
            <Skeleton className="flex rounded-xl w-full h-14" />
        )
    );

    const footer = () => (
        <Button
            variant="bordered"
            onClick={handleDelete}
            color='primary'
            isDisabled={loading} // Disable button when loading
        >
            Delete
        </Button>
    );

    return (
        <Card title="Delete Category" image={<Trash />} body={body()} footer={footer()} />
    );
};

export default DeleteCategory;
