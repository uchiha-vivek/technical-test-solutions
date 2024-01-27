// Connecting the Database

const mongoose = require('mongoose')


const dbConnection =  async function(){

    try{
        const MONGO_URL = process.env.DB_URI
        await mongoose.connect(MONGO_URL,{useUnifiedTopology:true})
        console.log(`Database successfully connected to MongoDb!`)

    }catch(e){
           console.log(`Error while connecting to the database`,e.message)
    }


}

module.exports = dbConnection


