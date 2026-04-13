import { useEffect, useLayoutEffect, useState } from 'react';
import { useMatch, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ProductContent, ProductForm } from './components';
import { Error, PrivateContent, Loader } from '../../components';
import { RESET_PRODUCT_DATA, loadProductAsync } from '../../actions';
import { selectProduct } from '../../selectors';
import { ROLE } from '../../constants';
import styled from 'styled-components';

const ProductContainer = ({ className }) => {
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	const dispatch = useDispatch();
	const params = useParams();
	const isCreating = !!useMatch('/product');
	const isEditing = !!useMatch('/product/:id/edit');
	const product = useSelector(selectProduct);

	useLayoutEffect(() => {
		dispatch(RESET_PRODUCT_DATA);
	}, [dispatch, isCreating]);

	useEffect(() => {
		if (isCreating) {
			setIsLoading(false);
			return;
		}

		dispatch(loadProductAsync(params.id))
			.then((productData) => setError(productData.error))
			.finally(() => {
				setIsLoading(false);
			});
	}, [dispatch, params.id, isCreating]);

	if (isLoading) {
		return <Loader />;
	}

	const SpecificProductPage =
		isCreating || isEditing ? (
			<PrivateContent access={[ROLE.ADMIN]} serverError={error}>
				<div className={className}>
					<ProductForm product={product} />
				</div>
			</PrivateContent>
		) : (
			<div className={className}>
				<ProductContent product={product} />
			</div>
		);

	return error ? <Error error={error} /> : SpecificProductPage;
};
export const Product = styled(ProductContainer)`
	margin: 40px 0;
	padding: 0px 80px;
`;
