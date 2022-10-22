const mongoose = require('mongoose')
const subCategorySchema = new mongoose.Schema({
    createDate: {
        type: Date,
        default: Date.now()
    },

    name: {
        type: String
    },
    hebrewName: {
        type: String
    },
    products: {
        type: mongoose.Schema.Types.ObjectId, ref: "Product"

    }



})
module.exports = mongoose.model('SubCategory', subCategorySchema)