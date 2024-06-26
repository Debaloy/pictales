import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGoogleLogin } from '@react-oauth/google'
import { useDispatch } from 'react-redux'
import axios from 'axios'

import { AUTH } from '../../constants/auth.js'

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(true)
  const [showPass, setShowPass] = useState(false)
  const [userData, setUserData] = useState({
    fname: '', lname: '', email: '', password: ''
  })

  const navigate = useNavigate()

  const [accessToken, setAccessToken] = useState('')
  const [profileObj, setProfileObj] = useState({})
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  const googleLogin = useGoogleLogin({
    onSuccess: (codeRes) => {
        setAccessToken(codeRes?.access_token)
        axios
        .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${codeRes?.access_token}`, {
            headers: {
                Authorization: `Bearer ${codeRes?.access_token}`,
                Accept: 'application/json'
            }
        })
        .then((res) => {
            setProfileObj(res.data)
            try {
                const action = {
                    type: AUTH,
                    data: { profileObj: res.data, accessToken: codeRes?.access_token }
                }
                dispatch(action)
                navigate('/')
            } catch (err) {
                console.log(err)
            }
        })
        .catch((err) => console.log(err))
    },
    onError: (err) => {
        console.warn(err)
    }
  })

  return (
    <div
        className='flex justify-center items-center py-10'
    >
        <div
            className='card flex flex-col gap-8 items-center border-2 border-slate-500 px-5 py-4 rounded-md ring-slate-500 ring-1'
        >
            <h2
                className='text-2xl font-bold text-blue-500'
            >
                { isSignUp ? 'Sign Up' : 'Sign In' }
            </h2>
            <form
                onSubmit={handleSubmit}
                className='flex flex-col gap-4 text-lg w-full'
            >
                {
                    isSignUp && (
                        <div
                            className='space-x-4'
                        >
                            <input 
                                type='text'
                                placeholder='First Name'
                                className='border-[1px] border-gray-400 px-2 py-1 rounded-md'
                                value={userData.fname}
                                onChange={e => setUserData({ ...userData, fname: e.target.value })}
                            />
                            <input 
                                type='text'
                                placeholder='Last Name'
                                className='border-[1px] border-gray-400 px-2 py-1 rounded-md'
                                value={userData.lname}
                                onChange={e => setUserData({ ...userData, lname: e.target.value })}
                            />
                        </div>
                    )
                }
                <input 
                    type='email'
                    placeholder='Email'
                    className='border-[1px] border-gray-400 px-2 py-1 rounded-md w-full'
                    value={userData.email}
                    onChange={e => setUserData({ ...userData, email: e.target.value })}
                />
                <div
                    className='relative'
                >
                    <input 
                        type={showPass ? 'text' : 'password'}
                        placeholder='Password'
                        className='border-[1px] border-gray-400 px-2 py-1 pr-8 rounded-md w-full'
                        value={userData.password}
                        onChange={e => setUserData({ ...userData, password: e.target.value })}
                    />
                    <button
                        onClick={() => setShowPass(!showPass)}
                        className='absolute right-1 top-1 px-2'
                    >{showPass ? 'Q' : 'O'}</button>
                </div>

                <button
                    onClick={googleLogin}
                    className='bg-blue-500 text-white font-semibold rounded-md py-2 hover:bg-blue-600'
                >Google Login</button>

                <button
                    type='submit'
                    className='bg-blue-500 text-white font-semibold rounded-md py-2 hover:bg-blue-600'
                >{isSignUp ? 'Sign Up' : 'Sign In'}</button>

                <div
                    className='space-x-2 text-gray-500'
                >
                    <label>
                        { isSignUp ? "Already have an account?" : "Don't have an account?" }
                    </label>

                    <button
                        onClick={() => setIsSignUp(!isSignUp)}
                        className='underline text-blue-500'
                    >
                        { isSignUp ? 'Sign In' : 'Sign Up' }
                    </button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Auth
