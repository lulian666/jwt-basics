require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()

const connectDB = require('./db/connect')
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')
const mainRouter = require('./routes/main')

app.use(express.json())
app.use(express.static('./public'))

app.use('/api/v1', mainRouter)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)


const PORT = process.env.PORT || 3000
// const MONGO_URI = process.env.MONGO_URI

const start = async () => {
    try {
        // await connectDB(MONGO_URI)
        app.listen(PORT, console.log(`Server listening on port ${PORT}`))
    } catch (error) {
        console.log(error)
    }
}

start()