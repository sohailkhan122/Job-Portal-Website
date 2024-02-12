const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const UserRoute = require('./Routes/UserRoute')
const CreateJobRoute = require('./Routes/CreateJobRoute')
const ApplyUserRoute = require('./Routes/ApplyUserRoute')
const AdminRoute = require('./Routes/AdminRoute')
const cors = require('cors')

const app = express();
app.use(express.json());
dotenv.config();
app.use(cors())
app.use(express.urlencoded({extended:false}))
app.set('view engine', 'ejs');

const connectDb = async () => {
    try {
        const connect = await mongoose.connect(process.env.CONNECTED_STRING);
        console.log("Server Is Connected To Database");
    } catch (error) {
        console.log("Server Is Not Connected To Database", error.message);
    }
}
connectDb();


app.use('/', UserRoute)
app.use('/', CreateJobRoute)
app.use('/', ApplyUserRoute)
app.use('/', AdminRoute)

const PORT = process.env.PORT || 8000
app.listen(PORT, console.log("Server Is Running..."))
