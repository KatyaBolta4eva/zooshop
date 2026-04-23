import { request } from '../utils';
import { ACTION_TYPE } from './action-type';

export const loadProductsAsync =
	(page = 1, limit = 10, search = '') =>
	(dispatch) =>
		request(`api/products?search=${search}&page=${page}&limit=${limit}`).then(
			({ error, data }) => {
				if (error) {
					return { error };
				}
				if (!data) {
					return { error: 'Товары не найдены' };
				}
				dispatch({
					type: ACTION_TYPE.SET_ALL_PRODUCTS,
					payload: { products: data.products, lastPage: data.lastPage },
				});
				return { error: null };
			},
		);
