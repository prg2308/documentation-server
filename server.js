if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const cors = require('cors')
const app = express()
const path = require('path')
const mongoose = require('mongoose')

const apiRoutes = require('./routes/apiRoutes')

const port = process.env.PORT || 8080
const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/docserver'

mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log(`Connected to MongoDB`)
    })
    .catch((err) => {
        console.log('Connection Error', err);
    })


app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())

app.use('/apis', apiRoutes)

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Main' });
})

app.get('*', (req, res) => {
    res.status(200).send('Page Not Found')
})

app.listen(port, () => {
    console.log(`Hosted on port ${port}`)
})