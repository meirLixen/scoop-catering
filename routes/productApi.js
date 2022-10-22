const router = require('express').Router()
const Product = require('../models/Product')
const Category = require('../models/Category')
// API PRODUCT:

//add product
router.post('/product/', async (req, res) => {
    try {
        const category = await Category.findOne({ _id: req.body.categoryID })
        console.log("----------- " + category);
        const newProduct = new Product(req.body)
        console.log("----------- " + newProduct);
        await newProduct.save()
        await category.products.push(newProduct)
        await category.save()
        console.log(category);

        res.json({ status: 201, product: newProduct })

    } catch (err) {
        res.json({ status: 500, error: err })
    }
})


// edit product
router.post('/products/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ["status"];
    const isValidOpreration = updates.every((update) => {

        allowedUpdates.includes(update)
    })
    if (isValidOpreration) {
        return res.status(404).send('invalid update')
    }
    try {
        console.log(req.body);
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        if (!product) {
            res.status(404).send('product not found')
        }
        res.send(product)
    } catch (err) {
        console.log(err);
    }
})
//delete product
router.delete('/product/:id', async (req, res) => {
    console.log("id:" + req.params.id);
    Product.findByIdAndDelete(req.params.id, (err, product) => {
        if (err)
            res.status(400).send(err)
        console.log("success!");
        res.status(200).send(product)
    })
})
// router.delete('/delproduct', async (req, res) => {
//     console.log("bhjbj");

//     Product.deleteMany({ description: 'חריף' }, (err, product) => {
//         if (err)
//             res.status(400).send(err)
//         console.log("success!");
//         res.status(200).send(product)
//     })


// })



//copy product
router.post('/copyProduct/:id', async (req, res) => {
    const id = req.params.id
    Product.findById(id).then((product) => {
        if (!product) {
            return res.status(404).send('product not found')
        }
        let copy = {
            "name": product.name,
            "hebrewName": product.hebrewName,
            "price": product.price,
            "available": product.available,
            "display": product.display,
            "description": product.description,
            'hebrewDescription': product.hebrewDescription,
            'categoryID': product.categoryID
        }
        const nproduct = new Product(copy)
        try {
            const newProduct = nproduct.save(function (err, product) {
                if (err) {
                    console.log(err)
                    return err;
                }
                res.json({ status: 201, product: product })
            })
        } catch (err) {
            res.json({ status: 500, error: err })
        }

    })
        .catch((err) => {
            res.status(500).send(err)
        })
})


// get all products
router.get('/products', async (req, res) => {

    Product.find().then(products => {
        if (!products)
            console.log(products);
        res.send(products);
    })
        .catch((err) => {
            res.status(500).send(err)
        })
})
// get product by id
router.get('/product/:id', async (req, res) => {
    console.log(req.params);
    const id = req.params.id
    Product.findById(id).then((product) => {
        if (!product) {
            return res.status(404).send('product not found')
        }
        res.send(product)
    })
        .catch((err) => {
            res.status(500).send(err)
        })
})
module.exports = router