import { request } from '../utils';
import { setCartItems } from './set-cart-items';

export const addToCartAsync = (productId) => (dispatch) =>
	request('/api/cart', 'POST', { productId, quantity: 1 }).then(
		({ data }) => {
			if (data) {
				dispatch(setCartItems(data));
			}

			return { error: null };
		},
	);
