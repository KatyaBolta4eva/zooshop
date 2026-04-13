const Cart = require("../models/Cart");

// get user cart

async function getCart(userId) {
  let cart = await Cart.findOne({ user_id: userId }).populate(
    "items.product_id"
  );

  if (!cart) {
    cart = await Cart.create({ user_id: userId, items: [] });
    cart = await Cart.findById(cart._id).populate("items.product_id");
  }

  return cart;
}

// add item to cart

async function addItemToCart(userId, productId, quantity = 1) {
  let cart = await Cart.findOne({ user_id: userId });

  if (!cart) {
    cart = await Cart.create({ user_id: userId, items: [] });
  }

  const existingItem = cart.items.find(
    (item) => item.product_id.toString() === productId// toString?
  );

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.items.push({ product_id: productId, quantity });
  }

  await cart.save();

  return Cart.findById(cart._id).populate("items.product_id");
}

// update item quantity in cart

async function updateItemQuantity(userId, productId, quantity) {
  const cart = await Cart.findOne({ user_id: userId });

  if (!cart) return null;

  const item = cart.items.find(
    (item) => item.product_id.toString() === productId
  );

  if (!item) return null;

  if (quantity <= 0) {
    cart.items = cart.items.filter(
      (item) => item.product_id.toString() !== productId
    );
  } else {
    item.quantity = quantity;
  }

  await cart.save();

  return Cart.findById(cart._id).populate("items.product_id");
}

// remove item from cart

async function removeItemFromCart(userId, productId) {
  const cart = await Cart.findOne({ user_id: userId });

  if (!cart) return null;

  cart.items = cart.items.filter(
    (item) => item.product_id.toString() !== productId
  );

  await cart.save();

  return Cart.findById(cart._id).populate("items.product_id");
}

// clear cart

async function clearCart(userId) {
  let cart = await Cart.findOne({ user_id: userId });

  if (!cart) return { items: [] };

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
