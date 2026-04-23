import { request } from '../utils/request';
import { setProductData } from './set-product-data';

export const saveProductAsync = (id, newProductData) => (dispatch) => {
	const saveRequest = id
		? request(`/api/products/${id}`, 'PATCH', newProductData)
		: request('/api/products', 'POST', newProductData);

	return saveRequest.then(({ error, data }) => {
		if (error) {
			return { error };
		}

		if (data) {
			dispatch(setProductData(data));
		}

		return { error: null, data };
	});
};
