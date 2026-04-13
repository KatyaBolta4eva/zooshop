export const deleteProduct = (productId) =>
	fetch(`http://localhost:3000/products/${productId}`, {
		method: 'DELETE',
	});
