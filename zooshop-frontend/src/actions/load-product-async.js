import { request } from '../utils';
import { setProductData } from './set-product-data';

export const loadProductAsync = (productId) => (dispatch) =>
	request(`/api/products/${productId}`).then(({ error, data }) => {
		if (error) {
			return { error };
		}

		if (data) {
			dispatch(setProductData(data));
		}
		return { error: null };
	});
