const Cart = require("../models/Cart");
const Product = require("../models/Product");
const Order = require("../models/Order");

const mapOrder = require("../helpers/mapOrder.js");

async function createOrder(userId) {
  const cart = await Cart.findOne({ user_id: userId }).populate(
    "items.product_id"
  );

  if (!cart || cart.items.length === 0) {
    throw new Error("Корзина пуста");
  }

  for (const item of cart.items) {
    if (item.product_id.quantity < item.quantity) {
      throw new Error(
        `Товар "${item.product_id.name}" — недостаточно на складе`
      );
    }
  }

  const orderItems = cart.items.map(mapOrder);

  const totalAmount = orderItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  await Order.create({ user_id: userId, items: orderItems, totalAmount });

  await Promise.all(
    cart.items.map((item) => {
      const currentQty = Number(item.product_id.quantity) || 0;
      const orderedQty = Number(item.quantity) || 0;

      return Product.findByIdAndUpdate(item.product_id._id, {
        quantity: currentQty - orderedQty,
      });
    })
  );

  cart.items = [];
  await cart.save();

  return { success: true };
}

module.exports = { createOrder };
