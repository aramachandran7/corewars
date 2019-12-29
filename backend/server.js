const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const path = require("path")
require('dotenv').config()


const app = express()

// Routing
const playRouter = require('./routes/play')
app.use('/play/', playRouter)


// MGDB setup
// mongodb+srv://aramachandran:Belur108@usertesting-cdidq.mongodb.net/test?retryWrites=true&w=majority
const db = 'mongodb+srv://aramachandran:Belur108@warriorscluster-bwcic.mongodb.net/test?retryWrites=true&w=majority\n';
mongoose.connect(db,{ useNewUrlParser: true })
    .then(() => console.log("MongoDB successfully connected"))
    .catch(err => console.log(err));

// port setup
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running at port ${port}`)
}) // this starts the server, listens on certain port