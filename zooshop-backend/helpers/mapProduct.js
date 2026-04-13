module.exports = function (product) {
  return {
    id: product.id,
    name: product.name,
    category: product.category,
    imageUrl: product.image_url,
    feedType: product.feed_type,
    dietType: product.diet_type,
    price: product.price,
    weightKg: product.weight_kg,
    description: product.description,
    content: product.content,
  };
};
