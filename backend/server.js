const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleware/errorMiddleware')
const {connectDB} = require('./config/db')
const PORT = process.env.PORT || 8000

// connect to the database
connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.get('/', (req, res) => {
    res.json({message: 'Welcome to support desk API'})
})

//*********
// Routes
//*********

//User Routes
app.use('/api/users', require('./routes/userRoutes')) 

//Ticket Routes
app.use('/api/tickets', require('./routes/ticketRoutes')) 

app.use(errorHandler)

app.listen(PORT, () => console.log(`server started on port ${PORT}`))