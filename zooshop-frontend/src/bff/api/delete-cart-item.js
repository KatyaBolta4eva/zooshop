export const deleteCartItem = async ({ userId, productId }) => {
	const response = await fetch(
		`http://localhost:3000/carts?user_id=${userId}&product_id=${productId}`,
	);
	const cartItems = await response.json();

	const cartItemId = cartItems[0].id;

	const deleteResponse = await fetch(`http://localhost:3000/carts/${cartItemId}`, {
		method: 'DELETE',
	});

	return deleteResponse.json();
};
