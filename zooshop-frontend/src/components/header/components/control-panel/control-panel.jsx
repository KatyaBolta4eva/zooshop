import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadCartAsync } from '../../../../actions';
import { Button, Icon } from '../../../../components';
import { selectUserRole, selectUserLogin, selectUserCart } from '../../../../selectors';
import { logout } from '../../../../actions';
import { checkAccess } from '../../../../utils';
import { ROLE } from '../../../../constants';
import styled from 'styled-components';

const RightAligned = styled.div`
	display: flex;
	justify-content: flex-end;
	align-items: center;
`;
const UserName = styled.div`
	font-size: 18px;
	font-weight: bold;
	color: #6d4c41;
`;

const ControlPanelContainer = ({ className }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const roleId = useSelector(selectUserRole);
	const login = useSelector(selectUserLogin);
	const cartItems = useSelector(selectUserCart);

	useEffect(() => {
		if (roleId === ROLE.BUYER) {
			dispatch(loadCartAsync());
		}
	}, [dispatch, roleId]);

	const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);

	const onLogout = () => {
		dispatch(logout());
		sessionStorage.removeItem('userData');
		navigate('/');
	};

	const isAdmin = checkAccess([ROLE.ADMIN], roleId);
	const isBuyer = checkAccess([ROLE.BUYER], roleId);

	return (
		<div className={className}>
			<RightAligned>
				{roleId === ROLE.GUEST ? (
					<Button>
						<Link to="/login">Войти</Link>
					</Button>
				) : (
					<>
						<UserName>{login}</UserName>
						<Icon
							id="fa-sign-out"
							margin="0 0 0 10px"
							color="#6D4C41"
							onClick={onLogout}
						/>
					</>
				)}
			</RightAligned>
			<RightAligned>
				{isBuyer && (
					<div className="cart-icon-wrapper">
						<Link to="/cart">
							<Icon
								id="fa-shopping-cart"
								size="30px"
								color="#6D4C41"
								margin="10px 18px 0 0"
							/>
							{cartItemsCount > 0 && (
								<span className="cart-badge">{cartItemsCount}</span>
							)}
						</Link>
					</div>
				)}

				<Icon
					id="fa-arrow-left"
					margin="10px 0 0 0"
					size="25px"
					color="#6D4C41"
					onClick={() => navigate(-1)}
				/>

				{isAdmin && (
					<>
						<Link to="/product">
							<Icon
								id="fa-paw"
								margin="10px 0 0 16px"
								size="25px"
								color="#6D4C41"
							/>
						</Link>
						<Link to="/admin-panel">
							<Icon
								id="fa-list"
								margin="10px 0 0 16px"
								size="25px"
								color="#6D4C41"
							/>
						</Link>
					</>
				)}
			</RightAligned>
		</div>
	);
};

export const ControlPanel = styled(ControlPanelContainer)`
	.cart-icon-wrapper {
		position: relative;
		display: inline-block;
	}
	.cart-badge {
		position: absolute;
		top: 12px;
		right: 12px;
		transform: translate(30%, -30%);
		background: #c97b7b;
		color: white;
		border-radius: 50%;
		min-width: 18px;
		height: 18px;
		font-size: 11px;
		font-weight: bold;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0 4px;
	}
	& i {
		cursor: pointer;
		transition: color 0.3s ease;

		&:hover {
			color: #c97b7b;
		}
	}
`;
