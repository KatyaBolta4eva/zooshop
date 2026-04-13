module.exports = function (cart) {
  if (!cart || !cart.items) {
    return [];
  }

  return cart.items.map((item) => ({
    id: item.product_id.id,
    name: item.product_id.name,
    price: item.product_id.price,
    imageUrl: item.product_id.image_url,
    quantity: item.quantity,
  }));
};
