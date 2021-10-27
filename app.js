require('dotenv').config()
const express = require('express');
const app = express();
//errors
require('express-async-errors')

const connectDB = require('./db/connect')
const productsRouter = require('./routes/products')

const notFoundMiddleware = require('./middleware/not-found')
const errorMiddleware = require('./middleware/error-handler')

//middleware
app.use(express.json())

//routes
app.get('/', (req, res) => {
    res.send('<h1> Store api </h2> <a href="/api/v1/products">products routes</a>')
})

app.use('/api/v1/products', productsRouter)

//products routes

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 5000;
const start = async() => {
    try {
        //conectDB

        await connectDB(process.env.MONGO_URI)
        app.listen(port, () => {
            console.log('server is listening');
        })
    } catch (error) {
        console.log(error);
    }
}
start()