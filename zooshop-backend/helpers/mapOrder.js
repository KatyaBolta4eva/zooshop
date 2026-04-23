module.exports = function (item) {
    return {
      product_id: item.product_id._id,
      name: item.product_id.name,
      price: item.product_id.price,
      quantity: item.quantity,
    };
  };