import styled from 'styled-components';

const PContainer = ({ children, className }) => {
	return <p className={className}>{children}</p>;
};

export const P = styled(PContainer)`
	color: ${({ color }) => color};
	font-weight: ${({ fontWeight }) => fontWeight || 'normal'};
`;
