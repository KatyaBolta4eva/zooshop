import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, H3, PrivateContent } from '../../components';
import { CartItem } from './components/cart-item/cart-item';
import { selectUserId, selectUserCart } from '../../selectors';
import { Loader, Error } from '../../components';
import {
	loadCartAsync,
	removeFromCartAsync,
	clearCartAsync,
	updateCartItemQuantityAsync,
	openModal,
	CLOSE_MODAL,
} from '../../actions';
import { ROLE } from '../../constants';
import styled from 'styled-components';

const CartContainer = ({ className }) => {
	const dispatch = useDispatch();
	const userId = useSelector(selectUserId);
	const cartItems = useSelector(selectUserCart);
	const navigate = useNavigate();

	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [isOperating, setIsOperating] = useState(false);

	useEffect(() => {
		if (userId) {
			setIsLoading(true);
			dispatch(loadCartAsync())
				.catch((error) => setError(error))
				.finally(() => {
					setIsLoading(false);
				});
		} else {
			navigate('/register')
		}
	}, [dispatch, userId]);

	const handleRemoveFromCart = (productId) => {
		setIsOperating(true);
		dispatch(removeFromCartAsync(productId))
			.catch((error) => setError(error))
			.finally(() => setIsOperating(false));
	};

	const handleUpdateQuantity = (productId, newQuantity) => {
		setIsOperating(true);
		const action = newQuantity <= 0
			? removeFromCartAsync(productId)
			: updateCartItemQuantityAsync(
					productId,
					newQuantity,
				);

		dispatch(action)
			.catch((error) => setError(error))
			.finally(() => setIsOperating(false));
	};

	
	const handleClearCart = () => {
		dispatch(
			openModal({
				text: 'Очистить корзину?',
				onConfirm: () => {
					setIsOperating(true);
					dispatch(clearCartAsync())
						.catch((error) => setError(error))
						.finally(() => {
							setIsOperating(false);
							dispatch(CLOSE_MODAL);
						});
				},
				onCancel: () => dispatch(CLOSE_MODAL),
			}),
		);
	};

	const handleCheckout = () => {
		navigate('/order-confirmation');
	};

	const totalPrice = cartItems.reduce(
		(total, item) => total + item.price * item.quantity,
		0,
	);

	if (error) {
		return <Error error={error} />;
	}

	if (isLoading) {
		return <Loader />;
	}

	return (
		<PrivateContent access={[ROLE.BUYER]} serverError={null}>
			<div className={className}>
				<H3>Корзина</H3>
				<div className="cart-items">
					{cartItems.length === 0 ? (
						<p>Корзина пуста</p>
					) : (
						cartItems.map((item) => (
							<CartItem
								key={item.id}
								item={item}
								onUpdateQuantity={(quantity) =>
									handleUpdateQuantity(item.id, quantity)
								}
								onRemove={() => handleRemoveFromCart(item.id)}
								disabled={isOperating}
							/>
						))
					)}
				</div>
				<div className="cart-summary">
					<div className="total-price">
						Общая стоимость: {totalPrice.toFixed(2)} руб.
					</div>
					<div className="cart-actions">
						<Button
							width="300px"
							backgroundcolor="#FFD8C1"
							onClick={handleCheckout}
							disabled={cartItems.length === 0 || isOperating}
						>
							Оформить заказ
						</Button>
						<Button
							width="300px"
							backgroundcolor="#eee"
							onClick={handleClearCart}
							disabled={cartItems.length === 0 || isOperating}
						>
							Очистить корзину
						</Button>
					</div>
				</div>
			</div>
		</PrivateContent>
	);
};

export const Cart = styled(CartContainer)`
	width: 800px;
	margin: 20px auto;
	padding: 15px;
	border: 1px solid #ccc;
	border-radius: 8px;

	& .cart-items {
		margin-bottom: 15px;
	}

	& .cart-summary {
		border-top: 1px solid #eee;
		padding-top: 15px;
	}

	& .total-price {
		font-weight: bold;
		margin-bottom: 10px;
	}

	& .cart-actions {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}
`;
