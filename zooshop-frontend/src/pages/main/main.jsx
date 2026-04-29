import { useMemo, useEffect, useState } from 'react';
import { request } from '../../utils';
import { ProductCard, Carousel, FiltersAndSort } from './components';
import { Pagination, Search } from '../components';
import { Loader } from '../../components';
import { debounce } from '../utils';
import { PAGINATION_LIMIT } from '../../constants';
import styled from 'styled-components';

const MainContainer = ({ className }) => {
	const [products, setProducts] = useState([]);
	const [page, setPage] = useState(1);
	const [lastPage, setLastPage] = useState(1);
	const [searchPhrase, setSearchPhrase] = useState('');
	const [shouldSearch, setShouldSearch] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	const [selectedCategory, setSelectedCategory] = useState('all');
	const [selectedDietType, setSelectedDietType] = useState('all');
	const [selectedSort, setSelectedSort] = useState('default');

	useEffect(() => {
		setIsLoading(true);
		request(
			`/api/products?search=${searchPhrase}&page=${page}&limit=${PAGINATION_LIMIT}&category=${selectedCategory}&dietType=${selectedDietType}&sort=${selectedSort}`,
		)
			.then(({ data: { products, lastPage } }) => {
				setProducts(products);
				setLastPage(lastPage);
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, [page, shouldSearch, selectedCategory, selectedDietType, selectedSort]);

	const startDelayedSearch = useMemo(() => debounce(setShouldSearch, 2000), []);

	const onSearch = ({ target }) => {
		setSearchPhrase(target.value);
		setPage(1);
		startDelayedSearch(!shouldSearch);
	};

	const handleCategoryChange = (category) => {
		setSelectedCategory(category);
		setPage(1);
	};

	const handleDietTypeChange = (dietType) => {
		setSelectedDietType(dietType);
		setPage(1);
	};

	const handleSortChange = (sortValue) => {
		setSelectedSort(sortValue);
		setPage(1);
	};

	return (
		<div className={className}>
			<div className="hero-section">
				<div className="search-overlay">
					<Search searchPhrase={searchPhrase} onChange={onSearch} />
				</div>
				<Carousel />
			</div>
			<div>
				<FiltersAndSort
					selectedCategory={selectedCategory}
					selectedDietType={selectedDietType}
					onCategoryChange={handleCategoryChange}
					onDietTypeChange={handleDietTypeChange}
					selectedSort={selectedSort}
					onSortChange={handleSortChange}
				/>

				{isLoading ? (
					<div className="loader-container">
						<Loader />
					</div>
				) : products.length > 0 ? (
					<div className="products-list">
						{products.map(
							({
								id,
								name,
								imageUrl,
								price,
								weightKg,
								category,
								dietType,
							}) => (
								<ProductCard
									key={id}
									id={id}
									name={name}
									imageUrl={imageUrl}
									price={price}
									weightKg={weightKg}
									category={category}
									dietType={dietType}
								/>
							),
						)}
					</div>
				) : (
					<div className="no-products-found">Товары не найдены</div>
				)}
			</div>
			{lastPage > 1 && products.length > 0 && (
				<Pagination page={page} lastPage={lastPage} setPage={setPage} />
			)}
		</div>
	);
};

export const Main = styled(MainContainer)`
	display: flex;
	flex-direction: column;
	justify-content: space-between;

	& .hero-section {
		position: relative;
		width: 100%;
		height: 400px;
		overflow: hidden;
	}

	& .search-overlay {
		position: absolute;
		top: 5%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: 10;
		width: 100%;
		max-width: 600px;
		padding: 0 20px;
		text-align: center;
	}

	& .products-list {
		display: flex;
		flex-wrap: wrap;
		padding: 20px;
		justify-content: center;
	}

	& .no-products-found {
		font-size: 18px;
		margin-top: 40px;
		text-align: center;
	}
`;
