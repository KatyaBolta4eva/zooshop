import { Button } from '../button/button';
import styled from 'styled-components';

export const FilterButton = styled(Button)`
	padding: 8px 16px;
	border: 2px solid #ddd;
	border-radius: 20px;
	background-color: #ffffff;
	font-size: 14px;
	width: auto;
	height: auto;
	transition: all 0.3s ease;

	&:hover {
		border-color: #ffc0cb;
	}

	&.active {
		background-color: #ffc0cb;
		color: #ffffff;
		border-color: #ffc0cb;
	}
`;
