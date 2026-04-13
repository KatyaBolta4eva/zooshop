import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hideToast } from '../../actions';
import { Button } from '../button/button';
import { selectToast } from '../../selectors';
import styled from 'styled-components';

const ToastContainer = ({ className }) => {
	const dispatch = useDispatch();
	const { isVisible, message, type } = useSelector(selectToast);

	const onClick = () => dispatch(hideToast());

	useEffect(() => {
		if (isVisible) {
			const timer = setTimeout(() => {
				dispatch(hideToast());
			}, 3000);
			return () => clearTimeout(timer);
		}
	}, [isVisible, dispatch]);

	if (!isVisible) return null;

	return (
		<div className={`${className} ${type}`}>
			<div className="toast-content">
				<span>{message}</span>
				<Button
					backgroundcolor="transparent"
					width="none"
					border="none"
					onClick={onClick}
				>
					×
				</Button>
			</div>
		</div>
	);
};

export const Toast = styled(ToastContainer)`
	position: fixed;
	bottom: 20px;
	right: 20px;
	z-index: 1000;
	min-width: 300px;
	max-width: 400px;
	padding: 16px;
	border-radius: 8px;
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
	animation: slideIn 0.3s ease-out;

	&.success {
		background-color: #ffe5e5;
		border: 1px solid #ffd1dc;
		color: #5d4037;
	}

	&.error {
		background-color: #f9d9c3;
		border: 1px solid #f6b0a6;
		color: #5d4037;
	}

	&.info {
		background-color: #d1ecf1;
		border: 1px solid #bee5eb;
		color: #0c5460;
	}

	& .toast-content {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	& span {
		margin-right: 3px;
	}

	@keyframes slideIn {
		from {
			transform: translateX(100%);
			opacity: 0;
		}
		to {
			transform: translateX(0);
			opacity: 1;
		}
	}
`;
