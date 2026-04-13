export const transformProduct = (dbProduct) => ({
	id: dbProduct.id,
	name: dbProduct.name,
	category: dbProduct.category,
	imageUrl: dbProduct.image_url,
	feedType: dbProduct.feed_type,
	dietType: dbProduct.diet_type,
	price: dbProduct.price,
	weightKg: dbProduct.weight_kg,
	description: dbProduct.description,
	content: dbProduct.content,
});
