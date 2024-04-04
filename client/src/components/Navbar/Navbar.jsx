import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import logo from '../../assets/logo.png'

const Navbar = () => {
    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem('profile'))
    )

    const location = useLocation()

    useEffect(() => {
        const token = user?.accessToken
        setUser(JSON.parse(localStorage.getItem('profile')))
    }, [location])

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const logout = () => {
        const action = {
            type: 'LOGOUT',
        }
        dispatch(action)
        setUser(null)
        navigate('/')
    }

    return (
        <div
            className='flex justify-between items-center px-4 py-3 border-2 border-[#567982] rounded-md'
        >
            <a href='/'>
                <img src={logo} alt='PicTales' className='w-44' />
            </a>

            {
                user ? (
                    <div
                        className='flex gap-8 items-center'
                    >
                        <img
                            className='rounded-[50%] w-16 border-red-400 border-2'
                            src={user.profileObj.picture}
                            alt={user.profileObj.name.charAt(0)}
                        />
                        <label className='font-semibold text-xl'>{user.profileObj.name}</label>
                        <button
                            className='px-4 bg-blue-500 text-white font-semibold rounded-md py-2 hover:bg-blue-600'
                            onClick={logout}
                        >Sign Out</button>
                    </div>
                ) : (
                    <a
                        className='px-4 bg-blue-500 text-white font-semibold rounded-md py-2 hover:bg-blue-600'
                        href='/auth'
                    >Sign In</a>
                )
            }
        </div>
    )
}

export default Navbar
