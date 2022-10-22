const mongoose = require('mongoose')

const productsOnOrderSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  amount: { type: Number }

})
module.exports = mongoose.model('ProductsOnOrder', productsOnOrderSchema)