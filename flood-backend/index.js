
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors';
import mongoose from 'mongoose';
import assessmentRoutes from './routes/assessment.js';
import { upload } from './middlewares/upload.js';
dotenv.config()
const server = express()

server.use(cors());

server.use(express.json())
server.use('/uploads', express.static('uploads'));
server.use('/api/assessment', assessmentRoutes)

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('Connected to MongoDB')
    server.listen(3000, () => {
        console.log('Server is running on port 3000')
    })
}).catch((err) => {
    console.error('Error connecting to MongoDB:', err)
})

