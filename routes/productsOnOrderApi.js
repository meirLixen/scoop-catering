const router = require('express').Router()
const ProductsOnOrder = require('../models/ProductsOnOrder')

// API ProductsOnOrder:

//add ProductsOnOrder

router.post('/productOnOrder', async (req, res) => {
    const productsOnOrder = new ProductsOnOrder(req.body)
    try {
        const newProductsOnOrder = await productsOnOrder.save(function (err, productsOnOrder) {
            if (err) {
                console.log(err)
                return err;
            }
            res.json({ status: 201, productsOnOrder: productsOnOrder })
        })
    } catch (err) {
        res.json({ status: 500, error: err })
    }
})

// edit productsOnOrder
router.post('/productsOnOrder/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    console.log("updates", updates)
    const allowedUpdates = ["amount"];
    const isValidOpreration = updates.every((update) => {
        console.log("update", update)
        allowedUpdates.includes(update)
    })
    if (isValidOpreration) {
        return res.status(404).send('invalid update')
    }
    try {
        console.log(req.body);
        const productsOnOrder = await ProductsOnOrder.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        if (!productsOnOrder) {
            res.status(404).send('productsOnOrder not found')
        }
        res.send(productsOnOrder)
    } catch (err) {
        console.log(err);
    }
})
//delete productsOnOrder
router.delete('/productsOnOrder/:id', async (req, res) => {
    console.log("id:" + req.params.id);
    ProductsOnOrder.findByIdAndDelete(req.params.id, (err, productsOnOrder) => {
        if (err)
            res.status(400).send(err)
        console.log("success!");
        res.status(200).send(productsOnOrder)
    })
})


// get all productsOnOrder
router.get('/productsOnOrder', async (req, res) => {
    ProductsOnOrder.find().populate("productId").then(productsOnOrder => {
        if (!productsOnOrder)
            console.log(productsOnOrder);
        res.send(productsOnOrder);
    })
        .catch((err) => {
            res.status(500).send(err)
        })
})
// get productsOnOrder by id
router.get('/productOnOrder/:id', async (req, res) => {
    console.log(req.params);
    const id = req.params.id
    ProductsOnOrder.findById(id).then((productsOnOrder) => {
        if (!productsOnOrder) {
            return res.status(404).send('productsOnOrder not found')
        }
        res.send(productsOnOrder)
    })
        .catch((err) => {
            res.status(500).send(err)
        })
})

module.exports = router