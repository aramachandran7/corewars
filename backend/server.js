const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const path = require("path")
require('dotenv').config()
const bodyParser = require('body-parser');



const app = express()
// config middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())
app.use(express.json())


// Routing
const playRouter = require('./routes/play')
app.use('/play/', playRouter)

// MGDB setup
// mongodb+srv://aramachandran:Belur108@usertesting-cdidq.mongodb.net/test?retryWrites=true&w=majority
var db = 'mongodb+srv://aramachandran:Belur108@warriorscluster-bwcic.mongodb.net/test?retryWrites=true&w=majority';
// db = process.env.ATLAS_URI
mongoose.connect(db,{ useNewUrlParser: true })
    .then(() => console.log("MongoDB successfully connected"))
    .catch(err => console.log(err));

const port2 = 5000;
// port setup
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running at port ${port}`)
}) // this starts the server, listens on certain port