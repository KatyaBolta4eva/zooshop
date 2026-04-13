import { request } from '../utils';
import { setCartItems } from './set-cart-items';

export const loadCartAsync = () => (dispatch) =>
	request('/api/cart').then(({ data }) => {
		if (data) {
			dispatch(setCartItems(data));
		}
		return { error: null };
	});
