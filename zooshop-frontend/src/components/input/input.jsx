import { forwardRef } from 'react';
import styled from 'styled-components';

const InputContainer = forwardRef(({ className, width, ...props }, ref) => {
	return <input className={className} {...props} ref={ref} />;
});

export const Input = styled(InputContainer)`
	width: ${({ width = '100%' }) => width};
	height: 40px;
	margin: 0 0 10px;
	padding: 10px;
	font-size: 18px;
	border: 1px solid #DED8C5;
	border-radius: 20px;
	background-color: rgba(255, 255, 255, 0.3);
	&:focus {
		outline: none;
	}
`;
