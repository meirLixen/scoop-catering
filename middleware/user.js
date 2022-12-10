const FBAuth = require("../firebase");

async function userMiddleware(req, res, next) {
  const token = getToken(req);

  if (!token) {
    return res.status(403).send({
      data: null,
      err: { message: "token is required" },
    });
  }

  const userUid = await FBAuth.verifyIdToken(token);

  if (!userUid || !userUid.uid) {
    res.cookie("token", "");

    return res.status(403).send({
      data: null,
      err: { message: "token not valid" },
    });
  }

  const user = await FBAuth.getUser(userUid.uid);

  res.cookie("token", token, { maxAge: 900000, httpOnly: false });
  req.user = user;

  next();
}

const getToken = (req) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    return req.headers.authorization.split(" ")[1];
  } else if (req.cookies.token) {
    return req.cookies.token;
  } else if (req.query && req.query.token) {
    return req.query.token;
  } else if (req.body && req.body.token) {
    return req.body.token;
  }

  return null;
};

module.exports = { userMiddleware, getToken };
