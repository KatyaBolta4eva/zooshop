const Cart = require("../models/Cart");

async function getCartWithPopulate(cartId) {
  const cart = await Cart.findById(cartId).populate("items.product_id");
  if (!cart) return null;

  return cart;
}

function getProductId(item) {
  return item.product_id._id
    ? item.product_id._id.toString()
    : item.product_id.toString();
}

function findCartItem(cart, productId) {
  return cart.items.find((item) => getProductId(item) === productId);
}

function filterOutProduct(cart, productId) {
  return cart.items.filter((item) => getProductId(item) !== productId) || [];
}

async function getCart(userId) {
  let cart = await Cart.findOne({ user_id: userId }).populate(
    "items.product_id"
  );

  if (!cart) {
    cart = await Cart.create({ user_id: userId, items: [] });
  }

  return cart;
}

async function addItemToCart(userId, productId, quantity = 1) {
  const cart = await getCart(userId);

  const existingItem = findCartItem(cart, productId);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.items.push({ product_id: productId, quantity });
  }

  await cart.save();
  return getCartWithPopulate(cart._id);
}

async function updateItemQuantity(userId, productId, quantity) {
  const cart = await Cart.findOne({ user_id: userId });

  const item = findCartItem(cart, productId);
  if (!item) return null;

  if (quantity <= 0) {
    cart.items = filterOutProduct(cart, productId);
  } else {
    item.quantity = quantity;
  }

  await cart.save();
  return getCartWithPopulate(cart._id);
}

async function removeItemFromCart(userId, productId) {
  const cart = await Cart.findOne({ user_id: userId });

  cart.items = filterOutProduct(cart, productId);
  await cart.save();
  return getCartWithPopulate(cart._id);
}

async function clearCart(userId) {
  const cart = await Cart.findOne({ user_id: userId });

  cart.items = [];
  await cart.save();
  return { items: [] };
}

module.exports = {
  getCart,
  addItemToCart,
  updateItemQuantity,
  removeItemFromCart,
  clearCart,
};
