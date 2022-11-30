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
    details: {

        type: String
    },
    hebrewDetails: {

        type: String
    },
    img: {
        type: String
    },
    outOfStock: {
        type: Boolean,
        default: false
    },
    display: {
        type: Boolean,
        default: true
    },
    recommended:{
        type: Boolean,
        default: false
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