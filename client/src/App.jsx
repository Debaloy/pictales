import React, { useState, useEffect } from "react"
import { useDispatch } from 'react-redux'

import Navbar from "./components/Navbar/Navbar"
import Posts from "./components/Posts/Posts"
import Form from "./components/Form/Form"

import { getPosts } from './actions/posts.js'

function App() {
  const [currentId, setCurrentId] = useState(null)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getPosts())
  }, [dispatch])

  return (
    <div
      className="w-full h-screen px-10 py-4"
    >
      <Navbar />

      <div
        className="grid grid-cols-2 gap-2 py-4"
      >
        <Posts setCurrentId={setCurrentId} />
        <Form currentId={currentId} setCurrentId={setCurrentId} />
      </div>
    </div>
  )
}

export default App
