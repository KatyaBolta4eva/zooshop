import { request } from '../utils';
import { setCartItems } from './set-cart-items';

export const updateCartItemQuantityAsync = (productId, quantity) => (dispatch) =>
	request('/api/cart', 'PATCH', { productId, quantity }).then(({ data }) => {
		if (data) {
			dispatch(setCartItems(data));
		}

		return { error: null };
	});


	
