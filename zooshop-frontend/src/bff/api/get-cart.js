import { transformCartItem } from '../transformers';

export const getCart = async (userId) =>
	fetch(`http://localhost:3000/carts?user_id=${userId}`)
		.then((res) => {
			if (res.ok) {
				return res;
			}
			const error =
				res.status === 404
					? 'Такая страница не существует'
					: 'Что-то пошло не так. Попробуйте ещё раз';

			return Promise.reject(error);
		})
		.then((dbCartItems) => dbCartItems.json())
		.then((dbCartItems) => dbCartItems && dbCartItems.map(transformCartItem));
