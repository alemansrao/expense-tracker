import React from 'react'
import Link from 'next/link'
type Props = {}
import { File, Layout, List, Menu, Monitor, PieChart, Plus, Search, Settings, TrendingUp } from 'react-feather'
const Navbar = (props: Props) => {
  return (<>
    <div className="navbar z-50 bg-black">
      <div className="navbar-start">
        <div className="dropdown ">
          <div>
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <Menu />
          </div>
          <ul
            tabIndex={1}
            className="menu menu-sm dropdown-content bg-black rounded-box z-[1] mt-3 w-52 p-2 shadow-white shadow-sm">
            <li><Link href="/"><Monitor size={16} />DashBoard</Link></li>
            <li>
              <details open>
                <summary><Link href="/transactions" className='flex flex-row gap-2 justify-center items-center'><TrendingUp size={16} />Transactions</Link></summary>
                <ul>
                  <li><Link href={"/transactions/new"}> <Plus size={14}/>Add</Link></li>
                  <li><Link href={"/transactions"}> <List size={14}/>View all</Link></li>
                </ul>
              </details>
            </li>
            {/* <li><a><PieChart size={16} /> Category</a></li> */}
            <div className="divider m-0"></div>
            <li><a><File size={16} /> Reports</a></li>
            <li><Link href={"/settings"}><Settings size={16} />Settings</Link></li>
            {/*in settings
             setting budgets
            setting categories */}
          </ul>
          </div>
        </div>
      </div>
      <div className="navbar-center">
        <a className="btn btn-ghost text-xl">ExTrack</a>
      </div>
      <div className="navbar-end">
        {/* <button className="btn btn-ghost btn-circle">
          <Search />
        </button> */}
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS Navbar component"
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
          </div>
        </div>
      </div>
    </div>
  </>
  )
}

export default Navbar