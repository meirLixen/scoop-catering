const router = require("express").Router();
const Menu = require("../models/Menu");
const Category = require("../models/Category");

// API MENU:
// get all menus
router.get("/menus", async (req, res) => {
    console.log("i am here menus");
  Menu.find()
    .then((menus) => {
      if (!menus) null;
      res.send(menus);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});




//add menu
router.post("/menu/", async (req, res) => {
  try {
 
    const newMenu = new Menu(req.body);
    await newMenu.save();
   
    res.json({ status: 201, product: newMenu });
  } catch (err) {
    res.json({ status: 500, error: err });
  }
});

// edit menu
router.post("/menus/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = Object.keys(new Menu());
  const isValidOpreration = updates.every((update) => {
    allowedUpdates.includes(update);
  });
  if (isValidOpreration) {
    return res.status(404).send("invalid update");
  }
  try {
    const menu = await Menu.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!menu) {
      res.status(404).send("menu not found");
    }
    res.send(menu);
  } catch (err) {
    console.error(err);
  }
});

//delete menu
router.delete("/menu/:id", async (req, res) => {
  Menu.findByIdAndDelete(req.params.id, (err, menu) => {
    if (err) res.status(400).send(err);
    res.status(200).send(menu);
  });
});

// router.delete('/delproduct', async (req, res) => {

//     Product.deleteMany({ description: 'חריף' }, (err, product) => {
//         if (err)
//             res.status(400).send(err)
//         res.status(200).send(product)
//     })

// })

//copy menu
router.post("/copyMenu/:id", async (req, res) => {
  const id = req.params.id;
  Menu.findById(id)
    .then((menu) => {
      if (!menu) {
        return res.status(404).send("menu not found");
      }
      let copy = {
        name: menu.name,
        hebrewName: menu.hebrewName,
        price: menu.price,
        outOfStock: menu.outOfStock,
        display: menu.display,
        description: menu.description,
        hebrewDescription: menu.hebrewDescription,
        categoryID: menu.categoryID,
      };
      const nMenu = new Menu(copy);
      try {
        const newMenu = nMenu.save(function (err, menu) {
          if (err) {
            console.error(err);
            return err;
          }
          res.json({ status: 201, menu: menu });
        });
      } catch (err) {
        res.json({ status: 500, error: err });
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});



// get menu by id
router.get("/menu/:id", async (req, res) => {
  const id = req.params.id;
  Menu.findById(id)
    .then((menu) => {
      if (!menu) {
        return res.status(404).send("menu not found");
      }
      res.send(menu);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

module.exports = router;
