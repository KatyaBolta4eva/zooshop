import { ControlPanel, Logo } from './components';
import styled from 'styled-components';

const Discription = styled.div`
	font-style: italic;
	margin-top: 20px;
	color: #8b4513;
`;

const HeaderContainer = ({ className }) => (
	<header className={className}>
		<Logo />
		<Discription>Корма премиум-класса для ваших любимцев</Discription>
		<ControlPanel />
	</header>
);

export const Header = styled(HeaderContainer)`
	display: flex;
	justify-content: space-between;
	position: fixed;
	top: 0;
	width: 1200px;
	height: 120px;
	padding: 20px 40px;
	background-color: #f8f2ed;
	box-shadow: 0px 5px 20px rgba(255, 140, 0, 0.15);
	z-index: 100;
`;
