export const updateCartItem = async ({ userId, productId, quantity }) => {
	const response = await fetch(
		`http://localhost:3000/carts?user_id=${userId}&product_id=${productId}`,
	);
	const cartItems = await response.json();

	const cartItemId = cartItems[0].id;

	const updateResponse = await fetch(`http://localhost:3000/carts/${cartItemId}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({ quantity }),
	});

	return updateResponse.json();
};
