import { Link } from 'react-router-dom';
import logoImage from '../../../../assets/images-logo/cat-logo.jpg';
import styled from 'styled-components';

const LogoImg = styled.img`
	margin: 10px 0px;
	height: 60px;
	width: 60px;
	border-radius: 50%;
	object-fit: cover;
	transition: transform 0.3s ease;

	&:hover {
		transform: scale(1.05);
	}
`;

const LargeText = styled.div`
	font-size: 48px;
	font-weight: 600;
	line-height: 48px;
	margin-top: 15px;
	color: #8b4513;

	&::before,
	&::after {
		content: '•';
		color: #b87333;
		margin: 0 15px;
		font-size: 2rem;
		position: relative;
		top: -0.25em;
	}
`;

const LogoContainer = ({ className }) => (
	<Link className={className} to="/">
		<LogoImg src={logoImage} alt="Логотип" />
		<div>
			<LargeText>У КОТА</LargeText>
		</div>
	</Link>
);

export const Logo = styled(LogoContainer)`
	display: flex;
	margin-top: -15px;
`;
