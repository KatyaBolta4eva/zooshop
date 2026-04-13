// const User = require("../models/User");
// const { verify } = require("../helpers/token");

// module.exports = async function (req, res, next) {
//   const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

//   if (!token) {
//     res.status(401).send({ error: "Token is missing" });
//     return;
//   }

//   let tokenData;
//   try {
//     tokenData = verify(token);
//   } catch (e) {
//     res.status(401).send({ error: "Invalid token" });
//     return;
//   }

//   const user = await User.findOne({ _id: tokenData.id });

//   if (!user) {
//     res.status(401).send({ error: "Authenticated user not found" });
//     return;
//   }

//   req.user = user;

//   next();
// };
const User = require("../models/User");
const { verify } = require("../helpers/token");

module.exports = async function (req, res, next) {
  const tokenData = verify(req.cookies.token);

  const user = await User.findOne({ _id: tokenData.id });

  if (!user) {
    res.send({ error: "Authenticated user not found" });

    return;
  }

  req.user = user;

  next();
};