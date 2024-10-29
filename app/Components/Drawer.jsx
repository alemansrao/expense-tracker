import React from 'react'
import { Menu, Monitor, PieChart, TrendingUp } from 'react-feather'

const Drawer = () => {
    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle w-6 h-6 bg-red-300 accent-slate-200 text-red-400" />
            {/* <div className="drawer-content flex flex-col items-center justify-center">
                <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">
                    Open drawer
                </label>
            </div> */}
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                    {/* Sidebar content here */}
                    <li><a><Monitor/>Dashboard</a></li>
                    <li><a><TrendingUp/> Transaction</a></li>
                    <li><a><PieChart/> Category</a></li>
                </ul>
            </div>
        </div>
    )
}

export default Drawer