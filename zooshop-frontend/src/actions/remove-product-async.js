import { request } from '../utils';

export const removeProductAsync = (id) => () =>
	request(`api/products/${id}`, 'DELETE').then(({ error }) => {
		if (error) {
			return { error };
		}
		return { error: null };
	});
