import { ACTION_TYPE } from '../actions';

const initialToastState = {
	isVisible: false,
	message: '',
	type: 'success',
};

export const toastReducer = (state = initialToastState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SHOW_TOAST:
			return {
				...state,
				isVisible: true,
				message: action.payload.message,
				type: action.payload.type,
			};
		case ACTION_TYPE.HIDE_TOAST:
			return {
				...state,
				isVisible: false,
				message: '',
			};
		default:
			return state;
	}
};
