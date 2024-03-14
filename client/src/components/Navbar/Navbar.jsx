import React from 'react'

import logo from '../../assets/logo.png'

const Navbar = () => {
    const user = null
    return (
        <div
            className='flex justify-between items-center px-4 py-3 border-2 border-[#567982] rounded-md'
        >
            <a href='/'>
                <img src={logo} alt='PicTales' className='w-44' />
            </a>

            {
                user ? (
                    <div>
                        <img src={user.result.imageUrl} alt={user.result.name.charAt(0)} />
                        <label>{user.result.name}</label>
                        <button>Sign Out</button>
                    </div>
                ) : (
                    <a href='/auth'>Sign In</a>
                )
            }
        </div>
    )
}

export default Navbar
