const mongoose = require('mongoose')

const connectDB = async(url) => {
    try{
        const conn = await mongoose.connect(url)
        console.log(`MongooseDB connected: ${conn.connection.host}`.cyan.underline)
    }
    catch(error){
        console.log(error)
        process.exit(1)
    }
}

module.exports = connectDB