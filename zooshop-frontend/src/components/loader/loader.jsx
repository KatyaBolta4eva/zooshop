import styled from 'styled-components';

const LoaderContainer = styled.div`
	.loader {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 80px;
		height: 80px;
		border: 8px solid #f8b0b0;
		border-radius: 50%;
		border-left-color: transparent;
		animation: loader 1s infinite;
		z-index: 1000;
	}

	@keyframes loader {
		0% {
			transform: translate(-50%, -50%) rotate(0deg);
		}
		100% {
			transform: translate(-50%, -50%) rotate(360deg);
		}
	}
`;

export const Loader = () => (
	<LoaderContainer>
		<div className="loader"></div>
	</LoaderContainer>
);
