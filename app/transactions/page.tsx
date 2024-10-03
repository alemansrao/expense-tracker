"use client"
import React, { useEffect, useState, useRef } from 'react'
import { Edit2, Trash2 } from 'react-feather'
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
type Props = {}

const Transaction = (props: Props) => {
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(false);
  function formatDate(dateString: string): string {
    const date: Date = new Date(dateString);
    const day: number = date.getDate();
    const month: string = date.toLocaleString("default", { month: "short" });
    const year: number = date.getFullYear();

    return `${day < 10 ? "0" + day : day}-${month}-${year}`;
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
                    editModal.showModal();
                  }
                }} />
                <dialog id="editModal" className="modal">
                  <div className="modal-box">
                    <h3 className="font-bold text-lg">Transaction Note!</h3>
                    <p className="py-4"> {transaction.description} </p>


                  </div>
                  <form method="dialog" className="modal-backdrop">
                    <button>Close</button>
                  </form>
                </dialog>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  )
}

export default Transaction