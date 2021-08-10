const express = require('express')
const mongoose = require('mongoose')
const Koder = require('./koderModel')
const server = express()

const DB_USER = 'fers'
const DB_PASSWORD = 'kodemia123'
const DB_HOST = 'kodemia-12va.o7aig.mongodb.net'
const DB_NAME = 'kodemia'

const url = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`




server.get('/', (request, response) => {
    response.json({
        message: 'API with mongoose'
    })
})

server.get('/koders', async (request, response) => {

    const koders = await Koder.find()


    response.json({
        success: true,
        message: 'all koders of DB',
        data: {
            koders
        }
    })
})

// Práctica:

// GET /koders?gender=m&age=23
// POST /koders
// PATCH /koders
// DELETE /koders


mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((connection) => {
        console.log('Yeii DB Connected ^^')
        server.listen(8080, () => {
            console.log('Server listening')
        })
    })
    .catch(err => {
        console.log('Error: ', err)
    })