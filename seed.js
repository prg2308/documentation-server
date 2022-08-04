if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const mongoose = require('mongoose');

const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/docserver'

mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log(`Connected to MongoDB`)
    })
    .catch((err) => {
        console.log('Connection Error', err);
    })


const Api = require('./models/apiModel')
const api = new Api({
    apiName: "Create a doctor profile",
    apiDescription: "API used to add a new doctor to the system",
    attributes: [
        {
            name: 'email',
            dataType: 'String',
            required: true,
        },
        {
            name: 'password',
            dataType: 'String',
            required: true,
        },
        {
            name: 'name',
            dataType: 'String',
            required: true,
        },
        {
            name: 'specialization',
            dataType: 'String',
            required: true,
        },
        {
            name: 'available',
            dataType: 'Boolean',
            required: true,
        },
        {
            name: 'qualifications',
            dataType: 'Array of Strings',
            required: true,
        },
        {
            name: 'experience',
            dataType: 'Number',
            required: true,
        },
    ],

    requestBaseURL: 'https://onehealth-api.herokuapp.com',
    requestPath: '/api/doctors/',
    requestMethod: 'POST',
    requestContentType: 'application/json',
    requestBody: JSON.stringify({
        "email": "prayag@gmail.com",
        "password": "iamprayag",
        "name": "Prayag Sharma",
        "specialization": "Caridology",
        "available": true,
        "qualifications": [
            "MBBS",
            "MD"
        ],
        "experience": 7
    }),
    returnDescription: 'Returns the newly created Account object',
    responseObject: JSON.stringify({
        "available": true,
        "name": "Prayag Sharma",
        "specialization": "Caridology",
        "qualifications": [
            "MBBS",
            "MD"
        ],
        "experience": 7,
        "appointments": [],
        "reports": [],
        "_id": "62eb9a2557a120cfd49ec8cb",
        "user": {
            "email": "prayag@gmail.com",
            "role": "doctor",
            "_id": "62eb9a2557a120cfd49ec8c8",
            "username": "prayag@gmail.com",
            "salt": "612304e8e33f7fdb1fe645e579b2f7dffab21e0a0cef25e0346768fdfa3fe00d",
            "hash": "267f819adb2c1c93ea8d027d87406598572f8a475ca89f26d26aea3adf1ae381e36205ae39255ef64a27cf2a04abdd5da207674969d4530428b14018ae853b629baa929e22bb8eb0a0a3bbb03a4c91b1f99601438fe236f3fb8dce3bed82909d6aabc9fe8080b6d399c55be38ae703fea8ff6abf8f7c419792725e590a422d3ab0383e44f58d3b1b1eda532e69ecba89306abeb82ff11f3e0fdfefc636c941d1123c46350e01d08626dbe87207941395180ab0935272264e24129a35a36a79c26fbef53fa349eb131a5cca957970b299a0a1ea3eb5388f6f987305c5cddebeb72569d41c4ac413cd3db84a5da808b3d9cbacea947ce3b527975a7f8a97b16de68336bafb486f7d5aa1668544519b2ce0520b692938abdfb440ff451c4d9643c81544f98d40ba98e422aeb5fb825221b01d0b4417a8f981f6d6623621ac3b4962b665261cb2b8c4638651e6ce52d1055393a0832f93a84a6e6ffcd5fc20865dfac288dca878e2f15296a5e6c296b9cdd66a8952c94a78aa38a94eb4a48a2916380217c675566a49997a7f327f044c244e44eb1c828d14e97b9a81cfa50624e64f58559f634bf7cff321135b45a9f3e697573775bdb2989946774f11699ebfa125d25ba0652dd5acf49c708f13ef360bcf834a495179cf5a7f5da2dfb4a7a0376e177c57e5b9c05c2cc6538d9cc6fb19b2009b167027c568087dddfa43e8af01aa",
            "__v": 0
        },
        "__v": 0
    })

})

api.save()
    .then(() => {
        console.log('Saved');
    })
    .catch((err) => {
        console.log(err);
    })