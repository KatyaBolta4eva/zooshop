import { request } from '../utils';
import { setCartItems } from './set-cart-items';

export const updateCartItemQuantityAsync = (productId, quantity) => (dispatch) =>
	request('/api/cart', 'PATCH', { productId, quantity }).then(({ error, data }) => {
		if (error) {
			return { error };
		}
		if (data) {
			dispatch(setCartItems(data));
		}

		return { error: null };
	});
