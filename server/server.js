// 1. import all dependencies
const express = require("express")
const cors = require('cors') // This line is added when doing fullstack
const app = express()

// 2.1 mongoose config
require('./configs/mongoose.config')

// 2.2 express configurations
app.use(cors()) // This line is added when doing fullstack
app.use(express.json())
app.use(express.urlencoded({extended: true})) 


// 3. getting the routes. This format limits making a const Routes and adding the addition Routes(app) line below.
require('./routes/author.routes')(app)

// 4. listen to the port
app.listen(8000, ()=>console.log("Listening to the port 8000"))