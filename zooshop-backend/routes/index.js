const express = require("express");

const router = express.Router({ mergeParams: true });

router.use("/", require("./auth"));
router.use("/products", require("./products"));
router.use("/cart", require("./cart"));
router.use("/orders", require("./orders"));

module.exports = router;
