import { Link } from 'react-router-dom';
import styled from 'styled-components';

const ProductCardContainer = ({ className, id, name, imageUrl, price, weightKg }) => {
	return (
		<div className={className}>
			<Link to={`/product/${id}`}>
				<img src={imageUrl || '/placeholder.jpg'} alt={name} />
				<div className="product-card-footer">
					<h4>{name}</h4>
					<div className="product-card-info">
						<div className="price">{price} ₽</div>
						<div className="weight">{weightKg} кг</div>
					</div>
				</div>
			</Link>
		</div>
	);
};

export const ProductCard = styled(ProductCardContainer)`
	display: flex;
	flex-direction: column;
	width: 280px;
	height: 380px;
	margin: 20px;
	border: 1px solid #ddd;
	border-radius: 12px;
	overflow: hidden;
	background: white;
	transition: box-shadow 0.3s;

	&:hover {
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
	}

	& a {
		display: flex;
		flex-direction: column;
		height: 100%;
		text-decoration: none;
		color: inherit;
	}

	& img {
		display: block;
		width: 100%;
		height: 230px;
		object-fit: cover;
		object-position: center 15%;
	}

	& .product-card-footer {
		padding: 15px;
		flex-grow: 1;
		display: flex;
		flex-direction: column;
	}

	& h4 {
		margin: 0 0 12px 0;
		font-size: 16px;
		font-weight: 600;
		line-height: 1.4;
		flex-grow: 1;
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	& .product-card-info {
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
		font-weight: bold;
		color: #2c3e50;
		padding-top: 10px;
		border-top: 1px solid #eee;
	}

	& .price {
		color: #5D4037;
		font-size: 20px;
	}

	& .weight {
		font-size: 14px;
		color: #7f8c8d;
		white-space: nowrap;
	}
`;
