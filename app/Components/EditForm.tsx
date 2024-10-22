import React, { useEffect, useState } from 'react'
import { getCategory } from '@/utils/api';
type Props = {}

const EditForm = async (props: { transaction: any }) => {




    const categories = await getCategory();
    console.log(categories);





    return (
        <form>
            <div className='flex justify-center items-center gap-4'>
                <label className="form-control w-full max-w-xs md:max-w-md">
                    <div className="label">
                        <span className="label-text-alt">Transaction type</span>
                    </div>
                    <select className="select select-bordered w-full max-w-xs md:max-w-md" defaultValue={props.transaction.type}>
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
                    <input type="number" name="amount" id="" className='input input-bordered' defaultValue={props.transaction.amount} />
                </label>
            </div>

            <div className='flex justify-center items-center gap-4'>
                <label className="form-control w-full max-w-xs md:max-w-md">
                    <div className="label">
                        <span className="label-text-alt">Category</span>
                    </div>
                    <input type="number" name="amount" id="" className='input input-bordered' />
                </label>
            </div>

        </form>
    )
}

export default EditForm