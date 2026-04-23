import { request } from '../utils';
import { setCartItems } from './set-cart-items';

export const clearCartAsync = () => (dispatch) =>
	request('/api/cart/clear', 'DELETE').then(({ error, data }) => {
		if (error) {
			return { error };
		}
		if (data) {
			dispatch(setCartItems(data));
		}
		return { error: null };
	});
