const router = require("express").Router();
const { userMiddleware } = require("../middleware/user");
const ProductsOnOrder = require("../models/ProductsOnOrder");

// API ProductsOnOrder:

//add ProductsOnOrder
router.post("/productOnOrder", userMiddleware, async (req, res) => {
  const productsOnOrder = new ProductsOnOrder(req.body);
  try {
    const newProductsOnOrder = await productsOnOrder.save(function (
      err,
      productsOnOrder
    ) {
      if (err) {
        console.error(err);
        return err;
      }
      res.json({ status: 201, productsOnOrder: productsOnOrder });
    });
  } catch (err) {
    res.json({ status: 500, error: err });
  }
});

// edit productsOnOrder
router.post("/productsOnOrder/:id", userMiddleware, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = Object.keys(new ProductsOnOrder());
  const isValidOpreration = updates.every((update) => {
    allowedUpdates.includes(update);
  });
  if (isValidOpreration) {
    return res.status(404).send("invalid update");
  }
  try {
    const productsOnOrder = await ProductsOnOrder.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!productsOnOrder) {
      res.status(404).send("productsOnOrder not found");
    }
    res.send(productsOnOrder);
  } catch (err) {
    console.error(err);
  }
});

//delete productsOnOrder
router.delete("/productsOnOrder/:id", userMiddleware, async (req, res) => {
  ProductsOnOrder.findByIdAndDelete(req.params.id, (err, productsOnOrder) => {
    if (err) res.status(400).send(err);
    res.status(200).send(productsOnOrder);
  });
});

// deleteAll productsOnOrder
router.delete("/deleteAllProductsOnOrder", async (req, res) => {
  console.log("vghbj");
  ProductsOnOrder.deleteMany({})
    .then( res.send("deleted all ProductsOnOrder"))
    .catch((err) => {
      res.status(500).send(err);
    })
})
// ProductsOnOrder.({})
// get all productsOnOrder
router.get("/productsOnOrder", async (req, res) => {
  ProductsOnOrder.find()
    .populate("productId")
    .then((productsOnOrder) => {
      if (!productsOnOrder) null;
      res.send(productsOnOrder);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

// get productsOnOrder by id
router.get("/productOnOrder/:id", async (req, res) => {
  const id = req.params.id;
  ProductsOnOrder.findById(id)
    .then((productsOnOrder) => {
      if (!productsOnOrder) {
        return res.status(404).send("productsOnOrder not found");
      }
      res.send(productsOnOrder);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

module.exports = router;
