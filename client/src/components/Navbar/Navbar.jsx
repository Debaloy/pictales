import React from 'react'

import logo from '../../assets/logo.png'

const Navbar = () => {
    return (
        <div
            className='flex justify-between px-4 py-3 border-2 border-[#567982] rounded-md'
        >
            <img src={logo} alt='PicTales' className='w-44' />
        </div>
    )
}

export default Navbar
