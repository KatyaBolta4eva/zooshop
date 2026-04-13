import { getCart } from '../api';
import { sessions } from '../sessions';
import { ROLE } from '../constants';

export const fetchUserCart = async (hash, userId) => {
	const accessRoles = [ROLE.BUYER];
	const access = await sessions.access(hash, accessRoles);

	let cartItems;
	let error;

	if (!access) {
		return {
			error: 'Доступ запрещён',
			res: null,
		};
	}

	try {
		cartItems = await getCart(userId);
	} catch (cartError) {
		error = cartError;
	}
	if (error) {
		return {
			error,
			res: null,
		};
	}
	return {
		error: null,
		res: cartItems,
	};
};
