export const updateProduct = ({
	id,
	name,
	category,
	imageUrl,
	feedType,
	dietType,
	price,
	weightKg,
	description,
}) =>
	fetch(`http://localhost:3000/products/${id}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			image_url: imageUrl,
			weight_kg: weightKg,
			feed_type: feedType,
			diet_type: dietType,
			name,
			category,
			price,
			description,
		}),
	}).then((loadedProduct) => loadedProduct.json());
