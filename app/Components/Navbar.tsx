import React from 'react'
import Link from 'next/link'
type Props = {}
import Dropdown from './Dropdown'
import { File, Layout, List, Menu, Monitor, PieChart, Plus, Search, Settings, TrendingUp } from 'react-feather'
const Navbar = (props: Props) => {
  return (<>
    <div className="navbar z-50 bg-black">
      <div className="navbar-start">
       <Dropdown/>
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