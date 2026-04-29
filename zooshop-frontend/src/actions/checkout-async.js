import { request } from '../utils';
import { setCartItems } from './set-cart-items';

export const checkoutAsync = () => (dispatch) =>
	request('/api/orders', 'POST').then(({ error }) => {
		if (error) {
			return { error };
		}
		dispatch(setCartItems([]));
		return { success: true };
	});
