import { useEffect, useState, useRef } from 'react';
import { toast } from 'react-toastify';
import { ArrowRight, Tool } from 'react-feather';
import Card from '@/app/Components/Card';
import { getLimit, updateLimit } from '@/utils/api';
import { Select, SelectItem, Input, Skeleton, Button } from '@nextui-org/react';

const LimitSetting = ({ expenseCategory }) => {
  const [currentCategoryId, setCurrentCategoryId] = useState(''); // ID of selected category
  const [limit, setLimit] = useState(''); // Current limit value
  const [changedLimit, setChangedLimit] = useState(false); // Track if limit has changed
  const [loading, setLoading] = useState(false); // Track loading state for button
  const updateButtonRef = useRef(null); // Ref for the update button

  // Initialize category and limit when expenseCategory data loads or changes
  useEffect(() => {
    if (expenseCategory.length > 0) {
      const initialCategory = expenseCategory[0];
      setCurrentCategoryId(initialCategory._id);
      setLimit(initialCategory.limit);
      setChangedLimit(false);
    }
  }, [expenseCategory]);

  // Update limit when the selected category changes
  useEffect(() => {
    if (currentCategoryId) {
      const selectedCategory = expenseCategory.find(cat => cat._id === currentCategoryId);
      if (selectedCategory) setLimit(selectedCategory.limit);
    }
  }, [currentCategoryId, expenseCategory]);

  // Handle category selection change
  const handleCategoryChange = (e) => {
    setCurrentCategoryId(e.target.value);
  };

  // Submit updated limit
  const handleSubmit = async () => {
    setLoading(true); // Set loading to true to disable button
    try {
      const response = await updateLimit({ limit, id: currentCategoryId });

      if (response.ok) {
        const data = await response.json();
        toast.success(`Limit for ${data.category.name} updated successfully`);
        setChangedLimit(false);
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || 'An error occurred');
      }
    } catch (error) {
      toast.error('An error occurred while updating the limit');
    } finally {
      setLoading(false); // Re-enable the button after response
    }
  };

  // Validate and handle limit update submission
  const handleUpdateClick = () => {
    if (!changedLimit) {
      toast.info('No changes made to the limit.');
    } else if (limit < 500) {
      toast.error('Limit should be greater than ₹500.');
    } else if (limit > 500000) {
      toast.error('Limit should be less than ₹500,000.');
    } else {
      handleSubmit();
    }

    if (updateButtonRef.current) {
      updateButtonRef.current.focus();
    }
  };

  // Component body for category selection and limit input
  const body = () => (
    <div className="card bg-neutral text-neutral-content w-full">
      <div className="card-body items-center text-center justify-evenly">
        {/* Category Selection */}
        <div className='flex flex-col gap-3 items-center w-full'>
          {expenseCategory.length > 0 ? (
            <>
              <Select
                label="Select expense category"
                selectedKeys={[currentCategoryId]}
                onChange={handleCategoryChange}
              >
                {expenseCategory.map(cat => (
                  <SelectItem key={cat._id} value={cat._id}>
                    {cat.name}
                  </SelectItem>
                ))}
              </Select>
              <Input
                type="number"
                label="Limit"
                value={limit}
                step={500}
                min={500}
                onChange={(e) => { setLimit(e.target.value); setChangedLimit(true); }}
              />
            </>
          ) : (
            <>
              <Skeleton className="flex rounded-xl w-full h-14" />
              <Skeleton className="flex rounded-xl w-full h-14" />
            </>
          )}
        </div>
      </div>
    </div>
  );

  // Component footer with update button
  const footer = () => (
    <Button
      variant="bordered"
      color="primary"
      onClick={handleUpdateClick}
      ref={updateButtonRef}
      disabled={loading} // Disable button when loading is true
    >
      {loading ? 'Updating...' : 'Update'} {/* Show loading text when loading */}
    </Button>
  );

  return (
    <Card image={<Tool />} body={body()} footer={footer()} title="Limit Setting" />
  );
};

export default LimitSetting;
