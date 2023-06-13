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
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],

})
module.exports = mongoose.model('Menu', menuSchema)