import React from 'react'
import '../App.css'

const Navbar = () => {
  return (
    <nav className='flex justify-between bg-black text-white py-2'>
        <div className="logo">
            <span className='font-bold text-xl mx-8'>To Do</span>
        </div>
      <ul className="flex gap-8 mx-9">
        <li className='cursor-pointer hover:font-bold transition-all'>Log In</li>
        <li className='cursor-pointer hover:font-bold transition-all'>Sign In</li>
      </ul>
    </nav>
  )
}

export default Navbar
