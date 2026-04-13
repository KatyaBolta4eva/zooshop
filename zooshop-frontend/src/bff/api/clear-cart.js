export const clearCart = async (userId) => {
	const response = await fetch(`http://localhost:3000/carts?user_id=${userId}`);
	const cartItems = await response.json();

	const deletePromises = cartItems.map((item) =>
		fetch(`http://localhost:3000/carts/${item.id}`, {
			method: 'DELETE',
		}),
	);

	await Promise.all(deletePromises);
	return { success: true };
};
