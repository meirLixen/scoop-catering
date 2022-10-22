const router = require('express').Router()
const Order = require('../models/Order')
const User = require('../models/User')
const ProductsOnOrder = require('../models/ProductsOnOrder')
// API ORDER

// add order (add order to user)
router.post('/order/:userId', async (req, res) => {
    try {
        console.log("i am here");

        const user = await User.findOne({ _id: req.params.userId })
        console.log("----------- " + user);
        const newOrder = new Order({
            date: Date.now(),
            userId: req.params.userId,
            numItems: req.body.numItems,
            CostToPay: req.body.CostToPay,
            shippingAddress: req.body.shippingAddress,
            city: req.body.city,
            status: req.body.status,
            MethodsOfPayment: req.body.MethodsOfPayment,
            products: req.body.products
        })
        console.log("----------- " + newOrder);
        console.log(newOrder);
        await newOrder.save()

        await user.orders.push(newOrder)
        await user.save()
        console.log(user);
        let productOnOrder
        newOrder.products.forEach(async (item) => {
            console.log("item.amount" + item.amount);
            productOnOrder = new ProductsOnOrder()
            productOnOrder = await ProductsOnOrder.findOne({ productId: item.productId })


            if (productOnOrder)//find result(!==null)
            {
                console.log("....................................................");
                productOnOrder.amount += item.amount
                productOnOrder.save()
            }

            else {
                console.log("))))))))))))))))))))))))))))))))))");
                const newProductOnOrder = new ProductsOnOrder({ productId: item.productId, amount: item.amount })
                newProductOnOrder.save()
            }
        })
        res.json({ status: 201, order: newOrder })

    } catch (err) {
        res.json({ status: 500, error: err })
    }
})



// edit order
router.post('/orders/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    console.log("updates", updates)
    const allowedUpdates = ["status", "products"];
    const isValidOpreration = updates.every((update) => {
        console.log("update", update)
        allowedUpdates.includes(update)
    })
    if (isValidOpreration) {
        return res.status(404).send('invalid update')
    }
    try {
        console.log(req.body);
        const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        if (!order) {
            res.status(404).send('order not found')
        }
        res.send(order)

    } catch (err) {
        console.log(err);
    }
})

//delete order (delete order from user)
router.delete('/order/:id', async (req, res) => {
    try {

        const order = await Order.findById(req.params.id)


        await User.findByIdAndUpdate(order.userId, { $pull: { orders: order._id } })


        await order.remove()
        res.json({ status: 201, message: "order deleted" })

    } catch (err) {
        console.log("bgfvdc");
        res.json({ status: 500, error: err })
    }
})
// get all orders
router.get('/orders', async (req, res) => {


    await Order.find().populate("userId").populate("products.productId").then(orders => {
        if (!orders)
            console.log(orders);
        res.send(orders);
    })
        .catch((err) => {
            res.status(500).send(err)
        })
        .catch((err) => {
            res.status(404).send(err)
        })
})
// get order by id
router.get('/order/:id', async (req, res) => {
    console.log(req.params);
    const id = req.params.id
    console.log("||||||||" + id);
    // const result = await Order.findById(id)
    // console.log("result::" + result);
    Order.findById(id).populate("productId").then((order) => {
        if (!order) {
            console.log("feild1");
            return res.status(404).send('order not found');

        }
        console.log("succesfull");
        res.send(order)
    })
        .catch((err) => {
            console.log("feild2");
            res.status(500).send(err)

        })
    console.log("feild3");

})
module.exports = router









