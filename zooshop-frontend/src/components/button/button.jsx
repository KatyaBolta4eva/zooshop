import styled from 'styled-components';

const ButtonContainer = ({ children, className, width, ...props }) => {
	return (
		<button className={className} {...props}>
			{children}
		</button>
	);
};

export const Button = styled(ButtonContainer)`
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 16px;
	width: ${({ width = '100%' }) => width};
	height: 35px;
	padding: 0 24px;
	border: ${({ border = '1px solid #DED8C5' }) => border};
	font-weight: ${({ fontWeight }) => fontWeight || 'normal'};
	background-color: ${({ disabled, backgroundcolor = '#F8F8F2' }) =>
		disabled ? '#EFEBE9' : backgroundcolor};
	color: ${({ color = '#000000' }) => color};
	border-radius: 20px;

	&: hover {
		cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
	}
`;
