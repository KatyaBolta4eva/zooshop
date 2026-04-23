import { useDispatch, useSelector } from 'react-redux';
import { selectUserRole } from '../../../../selectors';
import { addToCartAsync, showToast } from '../../../../actions';
import { H2, Button } from '../../../../components';
import { ROLE } from '../../../../constants';
import styled from 'styled-components';

const ProductContentContainer = ({
	className,
	product: {
		id,
		name,
		category,
		imageUrl,
		feedType,
		dietType,
		price,
		weightKg,
		description,
	},
}) => {
	const userRole = useSelector(selectUserRole);

	const dispatch = useDispatch();

	const isBuyer = ROLE.BUYER;

	const handleAddToCart = () => {
		dispatch(addToCartAsync(id))
		  .then(({error}) => {
			if (error) {
			  dispatch(showToast(error, 'error'));
			  return;
			}
			dispatch(showToast(`${name} добавлен в корзину!`, 'success'));
		  });
	  };

	return (
		<div className={className}>
			<img src={imageUrl || null} alt={name} />

			<div className="product-info">
				<div className="header-container">
					<H2> {name}</H2>
				</div>
				<div className="product-text">{description}</div>

				{userRole === isBuyer && (
					<Button
						width="280px"
						fontWeight="bold"
						backgroundcolor="#FFE5E5"
						onClick={handleAddToCart}
					>
						Добавить в корзину
					</Button>
				)}

				<div className="product-badge"> Вес: {weightKg} кг</div>
				<div className="product-price product-badge">{price} ₽</div>
				<div className="product-badge">{dietType}</div>
			</div>
		</div>
	);
};

export const ProductContent = styled(ProductContentContainer)`
	& img {
		float: left;
		margin: 40px 20px 10px 0;
		max-width: 300px;
		max-height: 300px;
		object-fit: cover;
	}

	& .product-info {
		overflow: hidden;
	}

	& .header-container {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	& .product-text {
		font-size: 18px;
		white-space: pre-line;
		line-height: 1.6;
		margin: 20px 0;
	}

	& .product-badge {
		display: inline-flex;
		align-items: center;
		background: #eee;
		color: #2c3e50;
		padding: 8px 15px;
		border-radius: 20px;
		font-size: 14px;
		font-weight: bold;
		border: 1px solid #a9a9a9;
	}

	& .product-price {
		margin: 20px 20px;
	}
`;
