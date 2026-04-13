import { deleteProduct } from '../api';
import { sessions } from '../sessions';
import { ROLE } from '../constants';

export const removeProduct = async (hash, id) => {
	const accessRoles = [ROLE.ADMIN];

	const access = await sessions.access(hash, accessRoles);

	if (!access) {
		return {
			error: 'Доступ запрещён',
			res: 'null',
		};
	}

	await deleteProduct(id);

	return {
		error: null,
		res: true,
	};
};
