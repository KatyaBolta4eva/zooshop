const express = require("express");

const {
  getCart,
  addItemToCart,
  updateItemQuantity,
  removeItemFromCart,
  clearCart,
} = require("../controllers/cart");

const authenticated = require("../middlewares/authenticated");
const hasRole = require("../middlewares/hasRole");
const mapCart = require("../helpers/mapCart");
const ROLES = require("../constants/roles");

const router = express.Router({ mergeParams: true });

router.get("/", authenticated, async (req, res) => {
  try {
    const cart = await getCart(req.user._id);
    res.send({ data: mapCart(cart) });
  } catch (e) {
    res.send({ error: e.message || "Unknown error" });
  }
});

router.post("/", authenticated, async (req, res) => {
  try {
    const cart = await addItemToCart(
      req.user._id,
      req.body.productId,
      req.body.quantity
    );
    res.send({ data: mapCart(cart) });
  } catch (e) {
    res.send({ error: e.message || "Unknown error" });
  }
});

router.patch("/", authenticated, async (req, res) => {
  try {
    const cart = await updateItemQuantity(
      req.user._id,
      req.body.productId,
      req.body.quantity
    );
    if (!cart) {
      res.send({ error: "Товар не найден в корзине!" });
      return;
    }
    res.send({ data: mapCart(cart) });
  } catch (e) {
    res.send({ error: e.message || "Unknown error" });
  }
});

router.delete("/", authenticated, async (req, res) => {
  try {
    await removeItemFromCart(req.user._id, req.body.productId);
    const cart = await getCart(req.user._id);
    res.send({ data: mapCart(cart) });
  } catch (e) {
    res.send({ error: e.message || "Unknown error" });
  }
});

router.delete("/clear", authenticated, async (req, res) => {
  try {
    await clearCart(req.user._id);
    res.send({ data: [] });
  } catch (e) {
    res.send({ error: e.message || "Unknown error" });
  }
});

module.exports = router;
