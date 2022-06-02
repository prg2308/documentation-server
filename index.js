const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')


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
    res.send('This is example route')
})

app.listen(3000, () => {
    console.log('Hosted on port 3000')
})