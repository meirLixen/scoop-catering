const router = require('express').Router()

const Category = require('../models/Category')


//api category

// add category
router.post('/category', async (req, res) => {
    const category = new Category(req.body)
    try {
        const newCategory = await category.save(function (err, category) {
            if (err) {
                console.log(err)
                return err;
            }
            res.json({ status: 201, category: newCategory })
        })
    } catch (err) {
        res.json({ status: 500, error: err })
    }
})


// find and update category by id
router.post('/categories/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    console.log("updates", updates)
    const allowedUpdates = ["name", "products"];
    const isValidOpreration = updates.every((update) => {
        console.log("update", update)
        allowedUpdates.includes(update)
    })
    if (isValidOpreration) {
        return res.status(404).send('invalid update')
    }
    try {
        console.log(req.body);
        const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        if (!category) {
            res.status(404).send('category not found')
        }
        res.send(category)
    } catch (err) {
        console.log(err);
    }
})

// DELETE CATEGORY

router.delete('/category/:id', async (req, res) => {
    console.log("id:" + req.params.id);
    Category.findByIdAndDelete(req.params.id, (err, category) => {
        if (err)
            res.status(400).send(err)
        console.log("success!");
        res.status(200).send(category)
    })
})


// get all categories
router.get('/categories', async (req, res) => {
    Category.find().populate("products").then(categories => {
        if (!categories)
            console.log(categories);
        res.send(categories);
    })
        .catch((err) => {
            res.status(500).send(err)
        })
})
// get category by id
router.get('/category/:id', async (req, res) => {
    console.log(req.params.id);
    try {
        const category = await Category.findById(req.params.id)
        res.status(200).json({ message: "find category", mycategory: category })

    }
    catch (error) {
        res.status(400).send("error")
    }
})
module.exports = router
