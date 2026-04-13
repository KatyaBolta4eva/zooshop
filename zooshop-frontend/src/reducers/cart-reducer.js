import { ACTION_TYPE } from '../actions';

const initialCartState = {
    items: [],
};

export const cartReducer = (state = initialCartState, action) => {
    switch (action.type) {
        case ACTION_TYPE.SET_CART_ITEMS:
            return {
                ...state,
                items: action.payload,
            };

        default:
            return state;
    }
};

