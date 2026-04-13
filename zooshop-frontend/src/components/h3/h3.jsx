import styled from 'styled-components';

const H3Container = ({ children, className }) => {
	return <h3 className={className}>{children}</h3>;
};

export const H3 = styled(H3Container)`
	color: ${({ color }) => color};
	margin: 20px 0;
`;
