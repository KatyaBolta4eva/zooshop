import { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loadProductsAsync } from '../../actions';
import { selectAllProducts, selectLastPage } from '../../selectors';
import { ROLE, PAGINATION_LIMIT } from '../../constants';
import {
	H2,
	H3,
	P,
	Button,
	Icon,
	SpecialPanel,
	PrivateContent,
	Loader,
} from '../../components';
import { Pagination, Search } from '../components';
import { debounce } from '../utils';
import styled from 'styled-components';

const AdminPanelContainer = ({ className }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [shouldUpdateProductsList, setShouldUpdateProductsList] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [page, setPage] = useState(1);
	const [searchPhrase, setSearchPhrase] = useState('');
	const [shouldSearch, setShouldSearch] = useState(false);

	const products = useSelector(selectAllProducts);
	const lastPage = useSelector(selectLastPage);

	useEffect(() => {
		setIsLoading(true);
		dispatch(loadProductsAsync(page, PAGINATION_LIMIT, searchPhrase)).finally(() => {
			setIsLoading(false);
		});
	}, [dispatch, shouldUpdateProductsList, page, shouldSearch]);

	const startDelayedSearch = useMemo(() => debounce(setShouldSearch, 2000), []);

	const onSearch = ({ target }) => {
		setSearchPhrase(target.value);
		setPage(1);
		startDelayedSearch(!shouldSearch);
	};

	const onCreate = () => {
		navigate('/product');
	};

	const onEdit = (id) => {
		navigate(`/product/${id}/edit`);
	};

	if (isLoading) {
		return (
			<PrivateContent access={[ROLE.ADMIN]} serverError={null}>
				<div className={className}>
					<Loader />
				</div>
			</PrivateContent>
		);
	}

	return (
		<PrivateContent access={[ROLE.ADMIN]} serverError={null}>
			<div className={className}>
				<div className="header">
					<H2 color="#5D4037">Админ-панель</H2>
					<div className="search-wrapper">
						<Search searchPhrase={searchPhrase} onChange={onSearch} />
					</div>
					<Button width="300px" onClick={onCreate}>
						+ Создать новый товар
					</Button>
				</div>

				<div className="products-list">
					{products.length === 0 ? (
						<P>Нет товаров</P>
					) : (
						products.map((product) => (
							<div key={product.id} className="product-item">
								<img
									className="product-image"
									src={product.imageUrl || ''}
									alt={product.name}
								/>
								<div className="product-details">
									<H3>{product.name}</H3>
									<P fontWeight="bold" color="#A88B8B">
										Категория: {product.category}
									</P>
									<P fontWeight="bold" color="#5D4037">
										Стоимость: {product.price} ₽
									</P>
									<P fontWeight="bold" color="#C97B7B">
										Количество на складе: {product.quantity} шт
									</P>
								</div>
								<SpecialPanel
									id={product.id}
									price={product.price}
									shouldUpdateProductsList={shouldUpdateProductsList}
									setShouldUpdateProductsList={
										setShouldUpdateProductsList
									}
									editButton={
										<Icon
											id="fa-pencil"
											margin="0 10px 0px 0"
											color="#2c3e50"
											size="30px"
											onClick={() => onEdit(product.id)}
										/>
									}
								/>
							</div>
						))
					)}
					{lastPage > 1 && (
						<Pagination page={page} lastPage={lastPage} setPage={setPage} />
					)}
				</div>
			</div>
		</PrivateContent>
	);
};

export const AdminPanel = styled(AdminPanelContainer)`
	padding: 20px;

	& .header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 30px;

		& .search-wrapper {
			margin: 0;

			& > div {
				margin: 0;
			}
		}
	}

	& .products-list {
		display: flex;
		flex-direction: column;
		gap: 20px;
	}

	& .product-item {
		display: flex;
		align-items: center;
		padding: 16px;
		background: white;
		border-radius: 12px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	}

	& .product-image {
		width: 60px;
		height: 60px;
		object-fit: cover;
		border-radius: 8px;
		margin-right: 16px;
	}

	& .product-details {
		flex: 1;
	}

	& .product-details h3 {
		margin: 0 0 8px 0;
		font-size: 18px;
	}

	& i {
		cursor: pointer;
		transition: color 0.3s ease;

		&:hover {
			color: #c97b7b;
		}
	}
`;
