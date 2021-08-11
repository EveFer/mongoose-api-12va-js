const express = require('express')
const mongoose = require('mongoose')
const Koder = require('./koderModel')
const server = express()
 
const DB_USER = 'fers'
const DB_PASSWORD = 'kodemia123'
const DB_HOST = 'kodemia-12va.o7aig.mongodb.net'
const DB_NAME = 'kodemia'

const url = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`

server.use(express.json())


server.get('/', (request, response) => {
    response.json({
        message: 'API with mongoose'
    })
})

server.get('/koders', async (request, response) => {
    try {
        // destructuring
        const { gender, age, is_min_age } = request.query

        const filters = {}

        console.log(is_min_age)
        console.log(new Boolean(is_min_age))

        if(gender) filters.gender = gender
        if(age) {
            if(is_min_age === "true") {
                filters.age = { $gte: parseInt(age) }
            } else {
                filters.age = parseInt(age)
            }
        }

        // $gte => { age: { $gte: value } }

        const koders = await Koder.find(filters)


        response.json({
            success: true,
            message: 'all koders of DB',
            data: {
                koders
            }
        })

    } catch(error) {
        response.status(400)
        response.json({
            success: false,
            message: 'Algo salio mal'
        })
    }
})

server.post('/koders', async (request, response) => {
    try {
        const newKoder = request.body

        const koderCreated = await Koder.create(newKoder)
    
        response.json({
            success: true,
            message: 'Koder Created successfully',
            data: {
                koder: koderCreated
            }
        })
    } catch (error) {
        response.status(400)
        response.json({
            success: false,
            message: error.message
        })
    }
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