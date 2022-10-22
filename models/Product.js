const { type } = require('jquery')
const mongoose = require('mongoose')
const category = require('./Category')
const productSchema = new mongoose.Schema({
    name: {
        type: String
    },
    hebrewName: {
        type: String
    },
    price: {
        type: Number
    },
    description: {

        type: String
    },
    hebrewDescription: {

        type: String
    },
    img: {
        type: String
    },
    available: {
        type: Boolean,
        default: true
    },
    display: {
        type: Boolean,
        default: true
    },
    categoryID: {
        type: mongoose.Schema.Types.ObjectId, ref: "Category"
    },
    SubCategories: {
        type: mongoose.Schema.Types.ObjectId, ref: "SubCategory"
    },
    createDate: {
        type: Date,
        default: Date.now()
    },
    priceList: [{ amount: { type: mongoose.Schema.Types.ObjectId, ref: "Amount" }, price: { type: Number } }]
})
module.exports = mongoose.model('Product', productSchema)