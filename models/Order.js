
const mongoose = require('mongoose')
const { Product } = require('./Product')
const { User } = require('./User')

const orderSchema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now()
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId, ref: "User"

    },
    numItems: {
        type: String
    },
    CostToPay: {
        type: String
    },
    city: {
        type: String
    },
    shippingAddress: {
        type: String
    },
    status: {
        type: String,
        enum: ['in process', 'done'],
        default: 'in process'
    },
    MethodsOfPayment: {
        type: String
    },
    products: [{ productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" }, amount: { type: Number } }],

    //The owner of the order

})
module.exports = mongoose.model('Order', orderSchema)