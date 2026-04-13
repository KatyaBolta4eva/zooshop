import { transformProduct } from '../transformers';

export const getProduct = async (productId) =>
	fetch(`http://localhost:3000/products/${productId}`)
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
		.then((loadedProduct) => loadedProduct.json())
		.then((loadedProduct) => loadedProduct && transformProduct(loadedProduct));
