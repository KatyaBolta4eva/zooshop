import { sessions } from '../sessions';
import { ROLE } from '../constants';
import { clearCart } from '../api';

export const clearUserCart = async (hash, userId) => {
	const accessRoles = [ROLE.BUYER];
	const access = await sessions.access(hash, accessRoles);

	if (!access) {
		return {
			error: 'Доступ запрещён',
			res: null,
		};
	}

	await clearCart(userId);

	return {
		error: null,
		res: [],
	};
};
