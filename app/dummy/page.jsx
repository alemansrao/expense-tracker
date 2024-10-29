"use client"
import React, { useState } from 'react'

const page = () => {
    //VIP Tickets 4x4
    const [vipSeats, setVipSeats] = useState(
        [
            ['', '', '', ''],
            ['', '', '', ''],
            ['', '', '', ''],
            ['', '', '', ''],
        ]
    );

    //General Tickets 5x5
    const [normalSeats, setNormalSeats] = useState(
        [
            ['', '', '', '', ''],
            ['', '', '', '', ''],
            ['', '', '', '', ''],
            ['', '', '', '', ''],
            ['', '', '', '', '']
        ]
    )
    //economy tickets 6X6
    const [economySeats, setEconomySeats] = useState(
        [
            ['', '', '', '', '', ''],
            ['', '', '', '', '', ''],
            ['', '', '', '', '', ''],
            ['', '', '', '', '', ''],
            ['', '', '', '', '', ''],
            ['', '', '', '', '', '']
        ]
    )
    const totalBookedSeats = () => {
        let totalSeatsBooked = vipSeats.flat().filter((seat) => seat === 'X').length +
            normalSeats.flat().filter((seat) => seat === 'X').length +
            economySeats.flat().filter((seat) => seat === 'X').length;

        return totalSeatsBooked;
    }



    const handleClickOn = (category, rowId, colId) => {
        // Check if you're trying to uncheck an already booked seat
        let isSeatSelected = false;

        if (category === 'Vip') {
            isSeatSelected = vipSeats[rowId][colId] === 'X';
        } else if (category === 'Normal') {
            isSeatSelected = normalSeats[rowId][colId] === 'X';
        } else {
            isSeatSelected = economySeats[rowId][colId] === 'X';
        }

        // If seat is already selected, allow unchecking even if totalSeatsBooked === 5
        if (!isSeatSelected && totalBookedSeats() === 5) {
            alert("You can only book up to 5 tickets");
            return;
        }

        if (category === 'Vip') {
            let newVip = [...vipSeats];
            newVip[rowId][colId] = newVip[rowId][colId] === 'X' ? '' : 'X';
            setVipSeats(newVip);
        } else if (category === 'Normal') {
            let newNormal = [...normalSeats];
            newNormal[rowId][colId] = newNormal[rowId][colId] === 'X' ? '' : 'X';
            setNormalSeats(newNormal);
        } else {
            let newEconomy = [...economySeats];
            newEconomy[rowId][colId] = newEconomy[rowId][colId] === 'X' ? '' : 'X';
            setEconomySeats(newEconomy);
        }
    }


    const resetAll = () => {
        setVipSeats(
            [
                Array(4).fill(''), //['', '', '', ''],
                Array(4).fill(''), //['', '', '', ''],
                Array(4).fill(''), //['', '', '', ''],
                Array(4).fill(''), //['', '', '', ''],
            ]
        )
        setNormalSeats([
            Array(5).fill(''), //['', '', '', '', ''],
            Array(5).fill(''), //['', '', '', '', ''],
            Array(5).fill(''), //['', '', '', '', ''],
            Array(5).fill(''), //['', '', '', '', ''],
            Array(5).fill(''), //['', '', '', '', '']
        ])
        setEconomySeats(
            [
                Array(6).fill(''), //['', '', '', '', '', ''],
                Array(6).fill(''), //['', '', '', '', '', ''],
                Array(6).fill(''), //['', '', '', '', '', ''],
                Array(6).fill(''), //['', '', '', '', '', ''],
                Array(6).fill(''), //['', '', '', '', '', ''],
                Array(6).fill(''), //['', '', '', '', '', '']
            ]
        )
    }
    const bookSeats = () => {
        if(totalBookedSeats()<1){
            alert("Book atleast 1 seat");
            return;
        }
        let stringVipSeats=''
        let stringNormalSeats=''
        let stringEconomySeats=''
        for (let row = 0; row < vipSeats.length; row++) {
            for (let col = 0; col < vipSeats[row].length; col++) {
                if (vipSeats[row][col] === 'X') {
                    stringVipSeats += `Row ${row+1} seat ${col+1} ,`
                }
            }
        }
        for (let row = 0; row < normalSeats.length; row++) {
            for (let col = 0; col < normalSeats[row].length; col++) {
                if (normalSeats[row][col] === 'X') {
                    stringNormalSeats += `Row ${row+1} seat ${col+1} ,`
                }
            }
        }
        for (let row = 0; row < economySeats.length; row++) {
            for (let col = 0; col < economySeats[row].length; col++) {
                if (economySeats[row][col] === 'X') {
                    stringEconomySeats += `Row ${row+1} seat ${col+1} ,`
                }
            }
        }
        console.log(stringVipSeats?'Booked VIP Seats are:'+stringVipSeats:"");
        console.log(stringNormalSeats?'Booked Normal Seats are:'+stringNormalSeats:"");
        console.log(stringEconomySeats?'Booked Economy Seats are:'+stringEconomySeats:"");
    }


    return (<div className='flex flex-col gap-8 m-auto justify-center items-center'>
        <div className='flex gap-2'>
            <button className='btn btn-primary' onClick={() => resetAll()}>Reset</button>
            <button className='btn btn-primary' onClick={() => bookSeats()}>Book tickets</button>
        </div>
        <div className='flex flex-col gap-2'>
            {vipSeats.map((vipRow, rowIndex) => (
                <div key={rowIndex} className='flex flex-row gap-2' >
                    {vipRow.map((vipSeat, colIndex) => (
                        <div key={colIndex}
                            className={`w-12 h-12 ${vipSeat === 'X' ? 'bg-red-400' : 'bg-blue-400'} flex cursor-pointer border-black text-black text-2xl items-center justify-center`}
                            onClick={() => handleClickOn('Vip', rowIndex, colIndex)}
                        >{vipSeat}</div>
                    ))}

                </div>
            ))}
        </div>
        <div className='flex flex-col gap-2'>
            {normalSeats.map((normalRow, rowIndex) => (
                <div key={rowIndex} className='flex flex-row gap-2' >
                    {normalRow.map((normalSeat, colIndex) => (
                        <div key={colIndex}
                            className={`w-12 h-12 ${normalSeat === 'X' ? 'bg-red-500' : 'bg-blue-500'} flex border-black text-black text-2xl items-center justify-center`}
                            onClick={() => handleClickOn('Normal', rowIndex, colIndex)}
                        >{normalSeat}</div>
                    ))}

                </div>
            ))}
        </div>
        <div className='flex flex-col gap-2'>
            {economySeats.map((economyRow, rowIndex) => (
                <div key={rowIndex} className='flex flex-row gap-2' >
                    {economyRow.map((economySeat, colIndex) => (
                        <div key={colIndex}
                            className={`w-12 h-12 ${economySeat === 'X' ? 'bg-red-600' : 'bg-blue-600'} flex border-black text-black text-2xl items-center justify-center`}
                            onClick={() => handleClickOn('Economy', rowIndex, colIndex)}
                        >{economySeat}</div>
                    ))}

                </div>
            ))}
        </div>


    </div>
    )
}

export default page