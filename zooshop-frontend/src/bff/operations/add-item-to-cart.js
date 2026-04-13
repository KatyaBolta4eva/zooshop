import { sessions } from '../sessions';
import { addToCart, getCart, updateCartItem } from '../api';
import { ROLE } from '../constants';
import { transformToDbCartItem } from '../transformers';

export const addItemToCart = async (hash, userId, productData) => {
	const accessRoles = [ROLE.BUYER];
	const access = await sessions.access(hash, accessRoles);

	if (!access) {
		return {
			error: 'Доступ запрещён',
			res: null,
		};
	}

	const existingCart = await getCart(userId);
	const existingItem = existingCart.find((item) => item.id === productData.id);

	if (existingItem) {
		const newQuantity = existingItem.quantity + 1;
		await updateCartItem({
			userId,
			productId: productData.id,
			quantity: newQuantity,
		});
	} else {
		const dbCartItem = transformToDbCartItem({
			userId: userId,
			productId: productData.id,
			name: productData.name,
			price: productData.price,
			imageUrl: productData.imageUrl || productData.image_url,
			quantity: 1,
		});

		await addToCart(dbCartItem);
	}

	const updatedCart = await getCart(userId);
	return {
		error: null,
		res: updatedCart,
	};
};
