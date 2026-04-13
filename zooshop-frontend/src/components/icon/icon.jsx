import styled from 'styled-components';

const IconContainer = ({ className, id, inactive, ...props }) => (
	<div className={className} {...props}>
		<i className={`fa ${id}`} aria-hidden="true"></i>
	</div>
);

export const Icon = styled(IconContainer)`
	font-size: ${({ size = '24px' }) => size};
	margin: ${({ margin = '0' }) => margin};

	color: ${({ disabled, color }) => (disabled ? '#ccc' : color || '#000')};

	&: hover {
		cursor: ${({ inactive }) => (inactive ? 'default' : 'pointer')};
	}
`;
