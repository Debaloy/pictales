import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import 'dotenv/config'

import router from './routes/posts.js'

const app = express()

app.use(bodyParser.json({ limit: "20mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "20mb", extended: true }))
app.use(cors())

app.use('/', router)

const CONNECTION_URL = process.env.MONGO_DB_URL
const PORT = process.env.PORT

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } }

mongoose.connect(CONNECTION_URL, clientOptions)
.then(() => app.listen(PORT, () => {
    console.log("Connected to MongoDB Cluster")
    console.log(`Server running on PORT: ${PORT}`)
}))
.catch(err => console.log(err.message))
