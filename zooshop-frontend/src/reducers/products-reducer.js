import { ACTION_TYPE } from '../actions/action-type';

const initialProductsState = {
	products: [],
	lastPage: 1,
};

export const productsReducer = (state = initialProductsState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SET_ALL_PRODUCTS:
			return {
				products: action.payload.products || initialProductsState.products,
				lastPage:
					action.payload.lastPage != null
						? action.payload.lastPage
						: initialProductsState.lastPage,
			};
		default:
			return state;
	}
};
