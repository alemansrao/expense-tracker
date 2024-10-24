import React from 'react'
import Link from 'next/link'
type Props = {}
import Dropdown from './Dropdown'
import { File, Layout, List, Menu, Monitor, PieChart, Plus, Search, Settings, TrendingUp, User } from 'react-feather'
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
            {/* <User className='w-full h-full'/> */}
            <img
              className="invert"
              alt="Tailwind CSS Navbar component"
              src="https://lh3.googleusercontent.com/a/ACg8ocLtdJAs30aqynveHLEQBLSjp2qsyl4TiCWuCNGW-K6IjcLGVmnwaA=s96-c" />
          </div>
        </div>
      </div>
    </div>
  </>
  )
}

export default Navbar