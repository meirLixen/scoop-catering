const router = require("express").Router();

const Amount = require("../models/Amount");

//api amount

// add amount
router.post("/amount", async (req, res) => {
  const amount = new Amount(req.body);
  try {
    const newAmount = await amount.save(function (err, amount) {
      if (err) {
        console.error(err);
        return err;
      }
      res.json({ status: 201, amount: newAmount });
    });
  } catch (err) {
    res.json({ status: 500, error: err });
  }
});

// find and update amount by id
router.post("/amounts/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name"];
  const isValidOpreration = updates.every((update) => {
    allowedUpdates.includes(update);
  });
  if (isValidOpreration) {
    return res.status(404).send("invalid update");
  }
  try {
    const amount = await Amount.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!amount) {
      res.status(404).send("amount not found");
    }
    res.send(amount);
  } catch (err) {
    console.error(err);
  }
});

// DELETE amount

router.delete("/amount/:id", async (req, res) => {
  amount.findByIdAndDelete(req.params.id, (err, amount) => {
    if (err) res.status(400).send(err);
    res.status(200).send(amount);
  });
});

// get all amounts
router.get("/amounts", async (req, res) => {
  Amount.find()
    .then((amounts) => {
      if (!amounts) null;
      res.send(amounts);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});
// get amount by id
router.get("/amount/:id", async (req, res) => {
  const id = req.params.id;
  Amount.findById(id)
    .then((amount) => {
      if (!amount) {
        return res.status(404).send("amount not found");
      }
      res.send(amount);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});
module.exports = router;
