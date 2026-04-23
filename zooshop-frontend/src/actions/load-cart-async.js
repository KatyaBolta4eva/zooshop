import { request } from '../utils';
import { setCartItems } from './set-cart-items';

export const loadCartAsync = () => (dispatch) =>
	request('/api/cart').then(({ error, data }) => {
		if (error) {
			return { error };
		}
		if (data) {
			dispatch(setCartItems(data));
		}
		return { error: null };
	});
