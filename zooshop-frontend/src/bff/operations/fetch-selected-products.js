import { getSelectedProducts } from '../api';

export const fetchSelectedProducts = async (
	searchPhrase,
	page,
	limit,
	category = 'all',
	dietType = 'all',
	sort = 'default',
) => {
	const { products, links } = await getSelectedProducts(
		searchPhrase,
		page,
		limit,
		category,
		dietType,
		sort,
	);

	return {
		error: null,
		res: {
			products,
			links,
		},
	};
};
