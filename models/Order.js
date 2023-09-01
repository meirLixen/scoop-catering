
const mongoose = require('mongoose')
const { Product } = require('./Product')
const { Menu } = require('./Menu')
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
    shippingCost: {
        type: String
    },
    CostToPay: {
        type: String
    },
    orderType:{
         type: mongoose.Schema.Types.ObjectId, ref: "Menu" 
    },
    MethodsOfShipping: {
        type: String,
        enum: ['Pickup', 'HomeDelivery', 'Other']
    },
    city: {
        type: String
    },
    shippingAddress: {
        type: String
    },
    notes: {
        type: String,
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