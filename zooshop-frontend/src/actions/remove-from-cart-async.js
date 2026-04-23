import { request } from '../utils';
import { setCartItems } from './set-cart-items';

export const removeFromCartAsync = (productId) => (dispatch) =>
	request('/api/cart', 'DELETE', { productId }).then(({ error, data }) => {
		if (error) {
			return { error };
		}
		if (data) {
			dispatch(setCartItems(data));
		}

		return { error: null };
	});
