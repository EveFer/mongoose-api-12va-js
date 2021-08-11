const mongoose = require('mongoose')

// const addressSchema = new mongoose.Schema({
//     street: {
//         type: String,
//         required: true,
//     },
//     cp: {
//         type: String,
//     },
//     state: {
//         type: String,
//     }
// })

// Schema
const koderSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 2,
        maxLength: 50,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        minLength: 2,
        maxLength: 50,
        required: true,
        trim: true
    },
    age:  {
        type: Number,
        min: 0,
        max: 90,
        required: true,
    },
    gender: {
        type: String,
        enum: ['m', 'f'],
        required: true
    },
    generation: {
        type: Number,
        required: true,
        min: 1,
    },
    // address: addressSchema
})

// const koder = {
//     name: 'Carlos',
//     address: {
//         street: 'calle tal',
//         num: '#4'
//     }
// }


// model

const model = mongoose.model('koders', koderSchema)

module.exports = model