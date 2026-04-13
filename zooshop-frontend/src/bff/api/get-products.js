import { transformProduct } from '../transformers';

export const getProducts = () =>
	fetch('http://localhost:3000/products')
		.then((loadedProducts) => loadedProducts.json())
		.then((loadedProducts) => loadedProducts && loadedProducts.map(transformProduct));
