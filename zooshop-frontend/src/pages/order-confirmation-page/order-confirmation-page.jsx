import { H2, PrivateContent } from '../../components';
import { ROLE } from '../../constants';
import styled from 'styled-components';

const ConfirmationPageContainer = styled.div`
	text-align: center;
	padding: 20px;
`;

export const OrderConfirmationPage = () => {
	return (
		<PrivateContent access={[ROLE.BUYER]}>
			<ConfirmationPageContainer>
				<H2 color="#5D4037">Заказ оформлен!</H2>
			</ConfirmationPageContainer>
		</PrivateContent>
	);
};
