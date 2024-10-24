"use client"
import React from 'react'
import Link from 'next/link'
type Props = {}
import Dropdown from './Dropdown'
import { useSession } from 'next-auth/react'
import { File, Layout, List, Menu, Monitor, PieChart, Plus, Search, Settings, TrendingUp, User } from 'react-feather'
import Image from 'next/image'
const Navbar = (props: Props) => {
  const { data: session } = useSession()
  const { user } = session || {};
  return (<>
    <div className="navbar z-50 bg-black">
      <div className="navbar-start">
        <Dropdown />
      </div>
      <div className="navbar-center">
        <a className="btn btn-ghost text-xl">ExTrack</a>
      </div>
      <div className="navbar-end">
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
          <div className="w-10 rounded-full">
            {/* <User className='w-full h-full'/> */}
            {user?.image ? (<Image
              width={100}
              height={100}
              alt="Tailwind CSS Navbar component"
              src={user?.image} />)
              : (<User className='w-full h-full' />)}
          </div>
        </div>
      </div>
    </div>
  </>
  )
}

export default Navbar