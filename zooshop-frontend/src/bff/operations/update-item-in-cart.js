import { sessions } from '../sessions';
import { getCart, deleteCartItem ,updateCartItem } from '../api';
import { ROLE } from '../constants';


export const updateItemInCart = async (hash, userId, productId, quantity) => {
    const accessRoles = [ROLE.BUYER];
    const access = await sessions.access(hash, accessRoles);

    if (!access) {
        return {
            error: 'Доступ запрещён',
            res: null,
        };
    }

    if (quantity <= 0) {
        await deleteCartItem({ userId, productId });
    } else {
        await updateCartItem({ userId, productId, quantity });
    }

    const updatedCart = await getCart(userId);
    return {
        error: null,
        res: updatedCart,
    };
};
