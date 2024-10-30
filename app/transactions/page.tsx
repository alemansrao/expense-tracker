"use client"
import React, { useEffect, useState } from 'react';
import { Edit2, Eye, Trash2 } from 'react-feather';
import { toast } from 'react-toastify';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from '@nextui-org/react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Tooltip, Textarea,Input,Select,SelectItem } from "@nextui-org/react";
import { Skeleton } from "@nextui-org/skeleton";

type Transaction = {
  _id: string;
  username: string;
  category_id: string;
  type: string;
  amount: number;
  description: string;
  date: string;
  createdAt: string;
  modifiedAt: string;
};
const Transaction = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [editTransaction, setEditTransaction] = useState<Transaction | null>(null);
  const [originalTransaction, setOriginalTransaction] = useState<Transaction | null>(null);
  const [isSaveEnabled, setIsSaveEnabled] = useState(false);
  const { isOpen: isEditModalOpen, onOpen: onEditModalOpen, onClose: onEditModalClose } = useDisclosure();
  const username = 'alemansrao';
  const [emptyTransactions, setEmptyTransactions] = useState(false);


  const getTransactions = async () => {
    const response = await fetch(`/api/transaction?username=${username}`);
    const data = await response.json();
    if (data.transactions.length === 0) {
      console.log("No transactions found");
      setEmptyTransactions(true);
    }
    else {
      setEmptyTransactions(false);
    }
    setTransactions(data.transactions);
  };

  const deleteTransaction = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: string) => {
    e.stopPropagation()
    const confirmed = true; // Replace with actual confirmation logic if needed.
    if (!confirmed) return;

    const deletePromise = fetch(`/api/transaction/${id}`, { method: 'DELETE' });

    toast.promise(
      deletePromise,
      {
        pending: 'Deleting transaction...',
        success: 'Transaction deleted!',
        error: 'Failed to delete transaction',
      }
    );

    try {
      const response = await deletePromise;

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete transaction");
      }

      getTransactions(); // Refresh transactions after successful deletion
    } catch (error) {
      console.error(error);
    }
  };


  const handleOpenEditModal = (transaction: Transaction) => {
    setEditTransaction(transaction);
    setOriginalTransaction(transaction);
    onEditModalOpen();
  };

  const handleUpdate = async () => {
    if (!editTransaction || !isSaveEnabled) return;

    const response = await fetch(`/api/transaction/${editTransaction._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editTransaction),
    });

    const data = await response.json();

    if (response.ok) {
      toast.success(data.message);
      getTransactions();
      onEditModalClose();
    } else {
      toast.error(data.message);
    }
  };

  const handleFieldChange = (field: keyof Transaction, value: string | number) => {
    if (editTransaction) {
      const updatedTransaction = { ...editTransaction, [field]: value };
      setEditTransaction(updatedTransaction);

      // Check if there's any difference between original and edited transaction
      const hasChanges = JSON.stringify(updatedTransaction) !== JSON.stringify(originalTransaction);
      setIsSaveEnabled(hasChanges);
    }
  };

  useEffect(() => {
    getTransactions();
  }, []);

  const dummy = [1, 2, 3, 4];
  const tableLoadingRows = () => (
    dummy.map((item) => (
      <TableRow key={item}>
        <TableCell className={`hidden lg:table-cell`}>
          <div>
            <Skeleton className="h-3 w-14 rounded-lg" />
          </div>
        </TableCell>
        <TableCell className=''>
          <div>
            <Skeleton className="h-3 w-14 rounded-lg" />
          </div>
        </TableCell>
        <TableCell className=''>
          <div>
            <Skeleton className="h-3 w-14 rounded-lg" />
          </div>
        </TableCell>
        <TableCell className=''>
          <div>
            <Skeleton className="h-3 w-20 rounded-lg" />
          </div>
        </TableCell>
        <TableCell className='hidden md:table-cell w-full'>
          <div>
            <Skeleton className="h-3 w-3/4 rounded-lg" />
          </div>
        </TableCell>
        <TableCell className='flex flex-row gap-2 items-center'>
          {/* <Tooltip content="Click to View or Edit trasaction">
            <Eye className='flex'/>
          </Tooltip> */}
          <Skeleton className='h-6 w-6 rounded-full' />
          <Skeleton className='h-7 w-16 rounded-xl' />
        </TableCell>
      </TableRow>
    ))
  );

  return (
    <div className="overflow-x-auto bg-black">
      <Table isStriped isHeaderSticky aria-label="Example static collection table" className='w-full lg:w-3/5 m-auto' color='primary'>
        <TableHeader>
          <TableColumn className='w-20 hidden lg:table-cell'>Type</TableColumn>
          <TableColumn className='w-20'>Category</TableColumn>
          <TableColumn className='w-20'>Amount</TableColumn>
          <TableColumn className='w-20'>Date</TableColumn>
          <TableColumn className='hidden sm:table-cell'>Description</TableColumn>
          <TableColumn className='w-24'>Actions</TableColumn>
        </TableHeader>
        <TableBody emptyContent={"No transactions to display."}>
          {transactions.length === 0 && !emptyTransactions ? tableLoadingRows() : transactions.map((transaction) => (
            <TableRow key={transaction._id} >
              <TableCell className={`hidden lg:table-cell ${transaction.type == "Income" ? ' text-green-400' : ' text-danger'}`}>{transaction.type}</TableCell>
              <TableCell className={transaction.type == "Income" ? ' text-green-400 lg:text-foreground' : ' text-danger lg:text-foreground'}>{transaction.category_id}</TableCell>
              <TableCell className=''>{transaction.amount}</TableCell>
              <TableCell className=''>{new Date(transaction.date).toLocaleDateString()}</TableCell>
              <TableCell className='hidden sm:table-cell '>{transaction.description.length > 40 ? transaction.description.substring(0, 40) + "..." : transaction.description}</TableCell>
              <TableCell className='flex flex-row gap-2 items-center'>
                <Tooltip content="Click to View or Edit trasaction">
                  <Eye className='flex' onClick={() => handleOpenEditModal(transaction)} />
                </Tooltip>
                <Button color='danger' className='flex h-7 min-w-1 w-16' variant='bordered' onClick={(e) => deleteTransaction(e, transaction._id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Edit Modal */}
      <Modal isOpen={isEditModalOpen} onClose={onEditModalClose}>
        <ModalContent>
          <ModalHeader>Edit Transaction</ModalHeader>
          <ModalBody>
            {editTransaction && (
              <div>
                <Select
                            value={editTransaction.type}
                            label="Transaction type"
                            selectedKeys={[editTransaction.type]}
                            onChange={(e: any) => handleFieldChange("type", e.target.value)}
                            className="w-full"
                        >
                            <SelectItem key={"Expense"} value="Expense">Expense</SelectItem>
                            <SelectItem key={"Income"} value="Income">Income</SelectItem>
                        </Select>
                {/* <label>Amount:</label>
                <input
                  type="number"
                  value={editTransaction.amount}
                  onChange={(e) => handleFieldChange("amount", Number(e.target.value))}
                  className="w-full"
                /> */}
                <Input
                  type="number"
                  label="Amount"
                  value={editTransaction.amount.toString()}
                  onChange={(e) => handleFieldChange("amount", Number(e.target.value))}
                  className="w-full"
                />
                <label>Category:</label>
                <input
                  type="text"
                  value={editTransaction.category_id}
                  onChange={(e) => handleFieldChange("category_id", e.target.value)}
                  className="w-full"
                />
                <label>Date:</label>
                <input
                  type="date"
                  value={editTransaction.date.split('T')[0]}
                  onChange={(e) => handleFieldChange("date", e.target.value)}
                  className="w-full"
                />
                {/* <label>Description:</label> */}
                {/* <input
                  type="text"
                  value={editTransaction.description}
                  onChange={(e) => handleFieldChange("description", e.target.value)}
                  className="w-full"
                /> */}
                <Textarea
                type='text'
                value={editTransaction.description}
                  label="Description"
                  onChange={(e) => handleFieldChange("description", e.target.value)}
                  placeholder="Enter your description"
                  className="w-full"
                />
              </div>
            )}
          </ModalBody>
          <ModalFooter>
            <Button variant="bordered" color="danger" onPress={onEditModalClose}>
              Close
            </Button>
            <Button variant="bordered" color="primary" onPress={handleUpdate} isDisabled={!isSaveEnabled}>
              Save Changes
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Transaction;
