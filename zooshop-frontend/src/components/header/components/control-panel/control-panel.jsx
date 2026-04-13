import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Icon } from '../../../../components';
import { ROLE } from '../../../../constants';
import { selectUserRole, selectUserLogin } from '../../../../selectors';
import { logout } from '../../../../actions';
import { checkAccess } from '../../../../utils';
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
					<>
						<Link to="/cart">
							<Icon
								id="fa-shopping-cart"
								size="30px"
								color="#6D4C41"
								margin="10px 10px 0 0"
							/>
						</Link>
					</>
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

export const ControlPanel = styled(ControlPanelContainer)``;
