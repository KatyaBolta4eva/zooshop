export const addToCart = (dbCartItem) => {
	return fetch('http://localhost:3000/carts', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify(dbCartItem),
	}).then((response) => response.json());
};
