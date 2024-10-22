"use client"
import React, { useEffect, useState, useRef } from 'react'
import { Edit2, Trash2 } from 'react-feather'
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
type Props = {}
import { useCategories } from '@/hooks/useCategories';

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
  const [transactions, setTransactions] = useState([])
  const [editTransaction, setEditTransaction] = useState<Transaction>();
  function formatDate(dateString: string | any, flag: number = 0): string {
    if (dateString) {
      const date: Date = new Date(dateString);
      const day: number = date.getDate();
      const month: string = date.toLocaleString("default", { month: "short" });
      const monthNumeric: string = String(date.getMonth() + 1).padStart(2, "0");
      const year: number = date.getFullYear();

      if (flag === 1) {
        return `${year}-${monthNumeric}-${day < 10 ? "0" + day : day}`;
      }
      return `${day < 10 ? "0" + day : day}-${month}-${year}`;
    }

    // Provide a fallback return value
    return "";
  }

  const getTransactions = async () => {
    const response = await fetch('/api/transaction')
    const data = await response.json()
    setTransactions(data.transactions)
  }

  const deleteTransaction = async (id: string) => {
    // const confirmed = confirm("Are you sure you want to delete this transaction?");
    const confirmed = true;
    if (!confirmed) return;

    // Use toast.promise to handle the loading, success, and error states
    const deletePromise = fetch(`/api/transaction/${id}`, {
      method: 'DELETE',
    });

    toast.promise(
      deletePromise,
      {
        pending: 'Deleting transaction...',  // Loading message
        success: 'Transaction deleted!',     // Success message
        error: 'Failed to delete transaction', // Error message
      }
    );

    try {
      const response = await deletePromise;

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete transaction");
      }

      getTransactions();  // Refresh transactions after successful deletion
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getTransactions();
  }, [])

  const modalRef = useRef<HTMLDialogElement | null>(null);

  return (
    <div className="h-[calc(100vh-4rem)] overflow-x-auto bg-black">
      <table className="table ">
        {/* head */}
        <thead className=" ">
          <tr className="text-slate-200">
            <th></th>
            <th>Type</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Date</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {transactions?.map((transaction: any) => (
            <tr key={transaction._id}>
              <th></th>
              <td>{transaction.type}</td>
              <td>{transaction.amount}</td>
              <td>{transaction.category_id}</td>
              <td className='whitespace-nowrap'>{formatDate(transaction.date)}</td>
              {/* <td>{transaction.description}</td> */}


              <td >
                {transaction.description.length > 30 ? (
                  <>
                    <div className="badge text-nowrap" onClick={() => {
                      const modal = document.getElementById('modal') as HTMLDialogElement | null;
                      if (modal) {
                        modal.showModal();
                      }
                    }}>Show full note</div>
                    <dialog id="modal" className="modal">
                      <div className="modal-box">
                        <h3 className="font-bold text-lg">Transaction Note!</h3>
                        <p className="py-4"> {transaction.description} </p>
                      </div>
                      <form method="dialog" className="modal-backdrop">
                        <button>Close</button>
                      </form>
                    </dialog>
                  </>
                ) : (
                  transaction.description
                )}
              </td>

              <td className='flex flex-row gap-3'>
                <Trash2 size={20} onClick={() => deleteTransaction(transaction._id)} className='cursor-pointer hover:text-red-500' />


                <Edit2 size={20} className='cursor-pointer hover:text-blue-500 ' onClick={() => {
                  const editModal = document.getElementById('editModal') as HTMLDialogElement | null;
                  if (editModal) {

                    setEditTransaction(transaction);
                    editModal.showModal();
                  }
                }} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit modal */}
      <dialog id="editModal" className="modal">
        <div className="modal-box">
          <div className='flex justify-center items-center gap-4'>
            <label className="form-control w-full max-w-xs md:max-w-md">
              <div className="label">
                <span className="label-text-alt">Transaction type</span>
              </div>
              <select className="select select-bordered w-full max-w-xs md:max-w-md">
                <option value="Income">Income</option>
                <option value="Expense">Expense</option>
              </select>
            </label>
          </div>

          <div className='flex justify-center items-center gap-4'>
            <label className="form-control w-full max-w-xs md:max-w-md">
              <div className="label">
                <span className="label-text-alt">Amount</span>
              </div>
              <input type="number" name="amount"
                placeholder="Amount" className="input input-bordered w-full max-w-xs md:max-w-md" />
            </label>
          </div>

          <div className='flex justify-center items-center gap-4'>
            <label className="form-control w-full max-w-xs md:max-w-md">
              <div className="label">
                <span className="label-text-alt">Category</span>
              </div>
              <select name="transactionCategory" id="category"
                className="select select-bordered w-full max-w-xs md:max-w-md">
                {useCategories(editTransaction?.type).map((cat: any) => (
                  <option value={cat.name} key={cat._id}>{cat.name}</option>
                ))}
              </select>
            </label>
          </div>

          <div className='flex justify-center items-center gap-4'>
            <label className="form-control w-full max-w-xs md:max-w-md">
              <div className="label">
                <span className="label-text-alt">Transaction Date</span>
              </div>
              <input type="date" name="date" id="transactionDate"
                defaultValue={formatDate(editTransaction?.date, 1)}
                className="input select-bordered w-full max-w-xs md:max-w-md">
              </input>
            </label>
          </div>



          <div className='flex justify-center items-center gap-4'>
            <label className="form-control w-full max-w-xs md:max-w-md">
              <div className="label">
                <span className="label-text-alt">Description</span>
              </div>
              <input name="description" type="text"
                maxLength={150}
                value={editTransaction?.description}
                placeholder="Type here" className="input input-bordered w-full max-w-xs md:max-w-md" />
            </label>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>Close</button>
        </form>
      </dialog>
    </div>
  )
}

export default Transaction