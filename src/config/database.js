import dotenv from "dotenv"
import mongoose from 'mongoose'
dotenv.config()


const dbState = [{
    value: 0,
    label: "Disconnected"
},
{
    value: 1,
    label: "Connected"
},
{
    value: 2,
    label: "Connecting"
},
{
    value: 3,
    label: "Disconnecting"
}];


const connection = async () => {
    await mongoose.connect('mongodb://localhost:27017/nodejs')
    const state = mongoose.connection.readyState
    console.log(dbState.find(f => f.value === state).label, "to database") // connected to db
}

module.exports = connection 