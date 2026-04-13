import { ACTION_TYPE } from './action-type';

export const setCartItems = (items) => ({
	type: ACTION_TYPE.SET_CART_ITEMS,
	payload: items,
});
