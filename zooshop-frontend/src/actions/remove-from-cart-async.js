import { request } from '../utils';
import { setCartItems } from './set-cart-items';

export const removeFromCartAsync = (productId) => (dispatch) =>
	request('/api/cart', 'DELETE', { productId }).then(({ data }) => {
		if (data) {
			dispatch(setCartItems(data));
		}

		return { error: null };
	});
