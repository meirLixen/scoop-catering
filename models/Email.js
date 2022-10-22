
const mongoose = require('mongoose')
const emailSchema = new mongoose.Schema({
    created: {
        type: Date,
        default: Date.now()
    },
    email: {
        type: String,
        validate: {
            validator: function (v) {
                return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(v)
            },
            message: props => `${props.value} is not a valid Email!`

        }

    }
})
module.exports = mongoose.model('Email', emailSchema)