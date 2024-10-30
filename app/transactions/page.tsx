"use client";
import React, { useEffect, useState } from 'react';
import { Edit2, Trash2 } from 'react-feather';
import { toast } from 'react-toastify';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from '@nextui-org/react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import { Skeleton } from "@nextui-org/skeleton";


type Props = {};

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

const Transaction = (props: Props) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [editTransaction, setEditTransaction] = useState<Transaction | null>(null);
  const { isOpen: isEditModalOpen, onOpen: onEditModalOpen, onClose: onEditModalClose, onOpenChange: onEditModalChange } = useDisclosure();
  const username = 'alemansrao';

  const getTransactions = async () => {
    const response = await fetch(`/api/transaction?username=${username}`);
    const data = await response.json();
    console.log(data);
    setTransactions(data.transactions);
  };

  const deleteTransaction = async (e : React.MouseEvent<HTMLButtonElement, MouseEvent>, id: string) => {
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

  const handleUpdate = async () => {
    const response = await fetch(`/api/transaction/${editTransaction?._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editTransaction),
    });

    const data = await response.json();

    if (response.ok) {
      toast.success(data.message); // Show success toast
      getTransactions(); // Refresh the transaction list
      onEditModalClose(); // Close the modal
    } else {
      toast.error(data.message); // Show error toast
    }
  };
  const dummy = [1, 2, 3, 4];
  const tableLoadingRows = () => (
    dummy.map((item) => (
      <TableRow key={item}>
        <TableCell className='hidden w-1/6'>
          <div>
            <Skeleton className="h-3 w-1/5 rounded-lg" />
          </div>
        </TableCell>
        <TableCell>
          <div>
            <Skeleton className="h-3 w-full rounded-lg" />
          </div>
        </TableCell>
        <TableCell>
          <div>
            <Skeleton className="h-3 w-full rounded-lg" />
          </div>
        </TableCell>
        <TableCell>
          <div>
            <Skeleton className="h-3 w-full rounded-lg" />
          </div>
        </TableCell>
        <TableCell>
          <div>
            <Skeleton className="h-3 w-full rounded-lg" />
          </div>
        </TableCell>
        <TableCell>
          <div>
            <Skeleton className="h-3 w-full rounded-lg" />
          </div>
        </TableCell>
      </TableRow>
    ))
  );

  useEffect(() => {
    getTransactions();
  }, []);

  return (
    <div className="overflow-x-auto bg-black">
      <Table aria-label="Example static collection table" selectionMode="single" color='primary' className='overflow-y-hidden'>
        <TableHeader>
          <TableColumn className='hidden'>Type</TableColumn>
          <TableColumn>Category</TableColumn>
          <TableColumn>Amount</TableColumn>
          <TableColumn>Date</TableColumn>
          <TableColumn>Description</TableColumn>
          <TableColumn>Actions</TableColumn>
        </TableHeader>
        <TableBody >
          {transactions.length === 0 ? tableLoadingRows() : transactions.map((transaction) => (
            <TableRow key={transaction._id} className={transaction.type === 'Income' ? 'text-success' : 'text-danger'} onTouchEnd={() => { setEditTransaction(transaction); onEditModalOpen(); }} onClick={() => { setEditTransaction(transaction); onEditModalOpen() }}>
              <TableCell className='hidden'>{transaction.type}</TableCell>
              <TableCell>{transaction.category_id}</TableCell>
              <TableCell>{transaction.amount}</TableCell>
              <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
              <TableCell>{transaction.description}</TableCell>
              <TableCell>
                <button onClick={(e) => deleteTransaction(e, transaction._id)}>Delete</button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* <Table aria-label="Example static collection table">
        <TableHeader>
          <TableRow className="text-slate-200">
            <th>Type</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Date</th>
            <th>Description</th>
            <th>Actions</th>
          </TableRow >
        </TableHeader>
        <tbody>
          {transactions.map((transaction) => (
            <TableRow key={transaction._id}>
              <td>{transaction.type}</td>
              <td>{transaction.amount}</td>
              <td>{transaction.category_id}</td>
              <td>{new Date(transaction.date).toLocaleDateString()}</td>
              <td>{transaction.description}</td>
              <td>
                <Button variant="bordered" color="danger" onClick={() => deleteTransaction(transaction._id)}>
                  Delete
                </Button>
                <Button variant="bordered" color="primary" onClick={() => {
                  setEditTransaction(transaction);
                  onEditModalOpen();
                }}>
                  Edit
                </Button>
              </td>
            </TableRow >
          ))}
        </tbody>
      </Table> */}

      {/* Edit Modal */}
      <Modal isOpen={isEditModalOpen} onOpenChange={onEditModalChange}>
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader>Edit Transaction</ModalHeader>
              <ModalBody>
                {editTransaction && (
                  <div>
                    <label>Type:</label>
                    <select
                      value={editTransaction.type}
                      onChange={(e) => setEditTransaction({ ...editTransaction, type: e.target.value })}
                      className="w-full"
                    >
                      <option value="Income">Income</option>
                      <option value="Expense">Expense</option>
                    </select>
                    <label>Amount:</label>
                    <input
                      type="number"
                      value={editTransaction.amount}
                      onChange={(e) => setEditTransaction({ ...editTransaction, amount: Number(e.target.value) })}
                      className="w-full"
                    />
                    <label>Category:</label>
                    <input
                      type="text"
                      value={editTransaction.category_id}
                      onChange={(e) => setEditTransaction({ ...editTransaction, category_id: e.target.value })}
                      className="w-full"
                    />
                    <label>Date:</label>
                    <input
                      type="date"
                      value={editTransaction.date.split('T')[0]}
                      onChange={(e) => setEditTransaction({ ...editTransaction, date: e.target.value })}
                      className="w-full"
                    />
                    <label>Description:</label>
                    <input
                      type="text"
                      value={editTransaction.description}
                      onChange={(e) => setEditTransaction({ ...editTransaction, description: e.target.value })}
                      className="w-full"
                    />
                  </div>
                )}
              </ModalBody>
              <ModalFooter>
                <Button variant="bordered" color="danger" onPress={onClose}>
                  Close
                </Button>
                <Button variant="bordered" color="primary" onPress={() => {
                  if (editTransaction) {
                    handleUpdate();
                  }
                  onClose();
                }}>
                  Save Changes
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Transaction;
