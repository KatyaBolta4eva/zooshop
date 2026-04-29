import { useLayoutEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Error, Header, Footer, Modal, Toast } from './components';
import {
	Authorization,
	Product,
	Registration,
	AdminPanel,
	Main,
	Cart,
	OrderConfirmationPage,
} from './pages';
import { setUser } from './actions';
import { ERROR } from './constants';
import styled from 'styled-components';

const AppLayout = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	position: relative;
	width: 1200px;
	min-height: 100%;
	margin: 0 auto;
	background-color: #f8f2ed;
`;

const Page = styled.div`
	padding: 120px 0 20px;
`;

export const Zooshop = () => {
	const dispatch = useDispatch();

	useLayoutEffect(() => {
		const currentUserDataJSON = sessionStorage.getItem('userData');

		if (!currentUserDataJSON) {
			return;
		}

		const currentUserData = JSON.parse(currentUserDataJSON);
		dispatch(
			setUser({
				...currentUserData,
				roleId: Number(currentUserData.roleId),
			}),
		);
	}, [dispatch]);

	return (
		<AppLayout>
			<Header />
			<Page>
				<Routes>
					<Route path="/" element={<Main />} />
					<Route path="/login" element={<Authorization />} />
					<Route path="/register" element={<Registration />} />
					<Route path="/cart" element={<Cart />} />
					<Route path="/admin-panel" element={<AdminPanel />} />
					<Route path="/product" element={<Product />} />
					<Route path="/product/:id" element={<Product />} />
					<Route path="/product/:id/edit" element={<Product />} />
					<Route
						path="/order-confirmation"
						element={<OrderConfirmationPage />}
					/>
					<Route path="*" element={<Error error={ERROR.PAGE_NOT_EXIST} />} />
				</Routes>
			</Page>
			<Footer />
			<Modal />
			<Toast />
		</AppLayout>
	);
};
