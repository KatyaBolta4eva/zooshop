import { sessions } from '../sessions';
import { getCart, deleteCartItem } from '../api';
import { ROLE } from '../constants';


export const removeItemFromCart = async (hash, userId, productId) => {
    const accessRoles = [ROLE.BUYER];
    const access = await sessions.access(hash, accessRoles);

    if (!access) {
        return {
            error: 'Доступ запрещён',
            res: null,
        };
    }

    await deleteCartItem({ userId, productId });

    const updatedCart = await getCart(userId);
    return {
        error: null,
        res: updatedCart,
    };
};
