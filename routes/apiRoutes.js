const express = require('express');
const mongoose = require('mongoose');
const Api = require('../models/apiModel');
const router = express.Router();


router.get('/', async (req, res) => {
    try {
        const apis = await Api.find();
        if (apis.length === 0) {
            res.status(404).json({ message: 'No APIs found' });
        }
        return res.status(200).json({ apiCount: apis.length, apis });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: err });
    }
})

router.get('/names', async (req, res) => {
    try {
        const foundApis = await Api.find();
        const apis = foundApis.map((api) => {
            return {
                id: api._id,
                name: api.apiName
            }
        });
        return res.status(200).json({ apiCount: apis.length, apis: apis });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: err });
    }
})

router.get('/:id', async (req, res) => {
    try {
        if ((!req.params.id) || (!mongoose.Types.ObjectId.isValid(req.params.id))) {
            return res.status(400).json({ message: 'Invalid ID' });
        }
        const api = await Api.findById(req.params.id);
        if (!api || !api.apiName) {
            res.status(404).json({ message: 'No APIs found' });
        }
        return res.status(200).json(api);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: err });
    }
})

router.post('/add', async (req, res) => {

    try {
        const { api } = req.body;
        if (!api || !api.apiName) {
            return res.status(400).json({ message: 'Invalid data' });
        }
        const newApi = new Api(api);
        await newApi.save();
        return res.status(200).json({ message: 'API added successfully' });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: err });
    }
})

module.exports = router;

