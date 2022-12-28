const router = require("express").Router();
const User = require("../models/User");
const { userMiddleware } = require("../middleware/user");

// API USER:

// Set token cookie by server
router.post("/auth/setAuthCookie", userMiddleware, (req, res) => {
  res.status(200).send("ok");
});

// add user
router.post("/user", userMiddleware, async (req, res) => {
  const FBUser = req.user;
  const bodyUser = req.body;

  if (FBUser.uid !== bodyUser.uid) {
    return res.status(403).send({
      data: null,
      err: { message: "error" },
    });
  }

  const user = new User(bodyUser);
  try {
    await user.save(function (err, newUser) {
      if (err) {
        console.error(err);
        return err;
      }
      res.json({ status: 201, user: newUser });
    });
  } catch (err) {
    res.json({ status: 500, error: err });
  }
});

// find and update user by uid
router.post("/users/:uid", userMiddleware, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = Object.keys(new User());
  const isValidOpreration = updates.every((update) => {
    allowedUpdates.includes(update);
  });
  if (isValidOpreration) {
    return res.status(404).send("invalid update");
  }
  try {
    const user = await User.findOneAndUpdate({ uid: req.params.uid }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      res.status(404).send("user not found");
    }
    res.send(user);
  } catch (err) {
    console.error(err);
  }
});


router.post("/updateUserDetails", async (req, res) => {

  try {
    const user = await User.findOneAndUpdate({ uid: req.body.uid }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      res.status(404).send("user not found");
    }
    res.send(user);
  } catch (err) {
    console.error(err);
  }
});

//update password of user
router.patch("/updateUserPassword", userMiddleware, async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { email: req.body.email },
      { password: req.body.password },
      { new: true }
    );
    res.status(200).json({ message: "password update", user: user });
  } catch (error) {
    res.status(400).send(error);
  }
});

// DELETE USER
router.delete("/user/:id", userMiddleware, async (req, res) => {
  User.findByIdAndDelete(req.params.id, (err, user) => {
    if (err) res.status(400).send(err);
    res.status(200).send(user);
  });
});

// get all users
router.get("/users", async (req, res) => {
  User.find()
    .populate("orders")
    .then((users) => {
      if (users) res.send(users);
      else res.send("no users");
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

// get user by id
router.get("/user/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate("orders");
    res.status(200).json({ message: "find user", myuser: user });
  } catch (error) {
    res.status(400).send("error");
  }
});

router.get("/userByUid/:uid", async (req, res) => {
  try {
    const myuser = await User.findOne({ uid: req.params.uid }).populate("orders");
    res.status(200).json({ message: "find user", myuser: myuser });
  } catch (error) {
    res.status(400).send("error");
  }
});

module.exports = router;
