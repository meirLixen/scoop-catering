const mongoose = require('mongoose')
const amountSchema = new mongoose.Schema({
    createDate: {
        type: Date,
        default: Date.now()
    },
    name: {
        type: String
    },

})
module.exports = mongoose.model('Amount', amountSchema)