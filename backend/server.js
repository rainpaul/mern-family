const express = require('express')
const app = express()
const memberRoute = require('./routes/members')
const goalRoute = require('./routes/goals')
const connectDB = require('./config/db')
const dotenv = require('dotenv')
dotenv.config()
const colors = require('colors')
const errorHandler = require('./middleware/errorMiddleware')

const port = 5000 | process.env.PORT
app.use(express.json())
app.use(errorHandler)
app.use('/api/v1/members',memberRoute)
app.use('/api/v1/goals',goalRoute)


const start = async () => {
    try{
        
        await connectDB(process.env.MONGO_URL)
        app.listen(port,() => {
            console.log(`Server is listening on port ${port}`)
        })
    }
    catch(err){
        console.log(err)
    }
    
}

start()