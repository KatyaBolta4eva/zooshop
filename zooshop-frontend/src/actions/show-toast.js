import { ACTION_TYPE } from './action-type';

export const showToast = (message, type = 'success') => ({
	type: ACTION_TYPE.SHOW_TOAST,
	payload: { message, type },
});
