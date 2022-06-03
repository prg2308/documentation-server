if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')

const port = process.env.PORT || 8080

//Since a remote atlas server has to be configured, this is left for later
// mongoose.connect('mongodb://localhost:27017/<dbname>', { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => {
//         console.log('Connected to mongod')
//     })
//     .catch((err) => {
//         console.log('Connection Error', err);
//     })


app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/example', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'If you are seeing this, server works!' });
})

app.listen(port, () => {
    console.log(`Hosted on port ${port}`)
})