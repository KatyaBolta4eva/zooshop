import { transformProduct } from '../transformers';

export const getSelectedProducts = (
	searchPhrase,
	page,
	limit,
	category = 'all',
	dietType = 'all',
	sort ='default'
) => {
	let url = `http://localhost:3000/products?_page=${page}&_limit=${limit}`;

	if (searchPhrase) {
		url += `&name_like=${searchPhrase}`;
	}

	if (category !== 'all') {
		url += `&category=${category}`;
	}

	if (dietType !== 'all') {
		url += `&diet_type=${dietType}`;
	}

	if (sort === 'price-low-high') {
		url += '&_sort=price&_order=asc';
	} else if (sort === 'price-high-low') {
		url += '&_sort=price&_order=desc';
	}

	return fetch(url)
		.then((loadedProducts) =>
			Promise.all([loadedProducts.json(), loadedProducts.headers.get('Link')]),
		)
		.then(([loadedProducts, links]) => ({
			products: loadedProducts && loadedProducts.map(transformProduct),
			links,
		}));
};
