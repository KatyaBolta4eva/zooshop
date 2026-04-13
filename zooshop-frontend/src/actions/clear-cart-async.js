import { request } from '../utils';
import { setCartItems } from './set-cart-items';

export const clearCartAsync = () => (dispatch) =>
	request('/api/cart/clear', 'DELETE').then(({ data }) => {
		dispatch(setCartItems(data));
		return { error: null };
	});
