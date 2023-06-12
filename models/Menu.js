const { type } = require('jquery')
const mongoose = require('mongoose')
const menuSchema = new mongoose.Schema({
    name: {
        type: String
    },
    hebrewName: {
        type: String
    },
    createDate: {
        type: Date,
        default: Date.now()
    },

})
module.exports = mongoose.model('Menu', menuSchema)