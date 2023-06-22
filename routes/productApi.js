const router = require("express").Router();
const Product = require("../models/Product");
const Category = require("../models/Category");
const Menu = require("../models/Menu");


// API PRODUCT:

//add product
router.post("/product/", async (req, res) => {
  try {
    var menu;
    const category = await Category.findOne({ _id: req.body.categoryID });
    const newProduct = new Product(req.body);
    await newProduct.save();
    await category.products.push(newProduct);
    await category.save();
    for (var i = 0; i < req.body.menus; i++) {
      menu = await Menu.findOne({ _id: req.body.menus[i] });
      await menu.products.push(newProduct);
      await menu.save();
    }


    res.json({ status: 201, product: newProduct });
  } catch (err) {
    res.json({ status: 500, error: err });
  }
});

//edit allProducts
router.post("/products/", async (req, res) => {
  console.log("edit allProducts");
  try {
    const product = await Product.updateMany({}, { menus: ["627d88a5cef5e2a03388bb1b"] });
    if (!product) {
      res.status(404).send("product not found");
    }
    res.send(product);
  } catch (err) {
    console.error(err);
  }

})



// edit product
router.post("/products/:id", async (req, res) => {
  console.log("update product")
  const updates = Object.keys(req.body);
  const allowedUpdates = Object.keys(new Product());
  const isValidOpreration = updates.every((update) => {
    allowedUpdates.includes(update);
  });
  if (isValidOpreration) {
    return res.status(404).send("invalid update");
  }
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!product) {
      res.status(404).send("product not found");
    }
    res.send(product);
  } catch (err) {
    console.error(err);
  }
});

//delete product
router.delete("/product/:id", async (req, res) => {
  Product.findByIdAndDelete(req.params.id, (err, product) => {
    if (err) res.status(400).send(err);
    res.status(200).send(product);
  });
});

// router.delete('/delproduct', async (req, res) => {

//     Product.deleteMany({ description: 'חריף' }, (err, product) => {
//         if (err)
//             res.status(400).send(err)
//         res.status(200).send(product)
//     })

// })
router.post("/copyProducts/", async (req, res) => {
  console.log("copyProducts");


  try {
    Product.copyTo("Product")
    // Product.find().forEach(
    //   async function (doc) {
    //     doc._id = new ObjectId();
    //     doc.menus = ["64875e1f59cff9c94f1639a3"]
    //     const newProduct = new Product(doc);
    //     await newProduct.save();
    //   }
      
    // )
    res.json({ status: 201, product: "copy all" });
  } catch (err) {
    res.json({ status: 500, error: err });
  }

});
//copy product
router.post("/copyProduct/:id", async (req, res) => {
  const id = req.params.id;
  Product.findById(id)
    .then((product) => {
      if (!product) {
        return res.status(404).send("product not found");
      }
      let copy = {
        name: product.name,
        hebrewName: product.hebrewName,
        price: product.price,
        outOfStock: product.outOfStock,
        display: product.display,
        description: product.description,
        hebrewDescription: product.hebrewDescription,
        categoryID: product.categoryID,
      };
      const nproduct = new Product(copy);
      try {
        const newProduct = nproduct.save(function (err, product) {
          if (err) {
            console.error(err);
            return err;
          }
          res.json({ status: 201, product: product });
        });
      } catch (err) {
        res.json({ status: 500, error: err });
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

// get all products
router.get("/products", async (req, res) => {
  console.log("i am here products");
  Product.find()
    //.populate("priceList.amount")
    .then((products) => {
      if (!products) null;
      res.send(products);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

// get product by id
router.get("/product/:id", async (req, res) => {
  const id = req.params.id;
  Product.findById(id)
    .then((product) => {
      if (!product) {
        return res.status(404).send("product not found");
      }
      res.send(product);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

module.exports = router;
