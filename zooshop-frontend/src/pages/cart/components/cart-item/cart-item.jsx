import { Icon, Button } from '../../../../components';
import styled from 'styled-components';

const CartItemContainer = ({
	className,
	item: { name, imageUrl, price, quantity },
	onUpdateQuantity,
	onRemove,
	disabled,
}) => {
	const increaseQuantity = () => {
		onUpdateQuantity(quantity + 1);
	};

	const decreaseQuantity = () => {
		onUpdateQuantity(quantity - 1);
	};

	return (
		<div className={className}>
			{imageUrl && (
				<img src={imageUrl} alt={name} className="item-image" />
			)}

			<div className="item-info">
				<div className="item-name">{name}</div>
				<div className="item-details">Цена: {price} руб.</div>
			</div>
			<div className="quantity-controls">
				<Button onClick={decreaseQuantity} disabled={disabled}>-</Button>
				<span>{quantity}</span>
				<Button onClick={increaseQuantity} disabled={disabled}>+</Button>
			</div>
			<div className="item-total">
				Итого: {(price * quantity).toFixed(2)} руб.
			</div>
			<Icon
				id="fa-trash-o"
				size="25px"
				color={disabled ? '#ccc' : 'red'}
				onClick={disabled ? null : onRemove}
			/>
		</div>
	);
};

export const CartItem = styled(CartItemContainer)`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 10px;
	border-bottom: 1px solid #eee;

	& .item-image {
		width: 60px;
		height: 60px;
		object-fit: cover;
		margin-right: 15px;
		border-radius: 4px;
		flex-shrink: 0;
	}

	& .item-info {
		flex-grow: 1;
		min-width: 200px;
		margin-right: 20px;
	}

	& .item-name {
		font-weight: bold;
	}

	& .item-details {
		color: #666;
		font-size: 0.9em;
	}

	& .quantity-controls {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 10px;
		width: 120px;
		flex-shrink: 0;
		margin: 0 20px;

		& button {
			width: 30px;
			height: 30px;
			padding: 0;
			display: flex;
			align-items: center;
			justify-content: center;
			flex-shrink: 0;
			font-size: 16px;


			&:hover {
				background-color: #e9e9e9;
			}
		}

		& span {
			min-width: 30px;
			text-align: center;
			font-weight: 500;
			font-size: 16px;
		}
	}

	& .item-total {
		font-weight: bold;
		width: 150px;
		text-align: right;
		flex-shrink: 0;
		margin-right: 20px;
	}

	& i {
		flex-shrink: 0;

		&:hover {
			color: #da190b;
		}
	}
`;
