"use client"
import React, { useEffect } from 'react'

const Dummy = () => {
    useEffect(()=>{
        const dummyElement = document.getElementById("dummy").click();
        console.log("Clicked")
    })
    return (
        <p id='dummy'>Test</p>
    )
}

export default Dummy