import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CLOSE_MODAL, openModal, removeProductAsync } from '../../actions';
import { Icon } from '../icon/icon';
import { checkAccess } from '../../utils';
import { selectUserRole } from '../../selectors';
import { ROLE } from '../../constants';
import styled from 'styled-components';

const SpecialPanelContaier = ({
	className,
	id,
	price,
	editButton,
	shouldUpdateProductsList,
	setShouldUpdateProductsList,
}) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const userRole = useSelector(selectUserRole);

	const onProductRemove = (id) => {
		dispatch(
			openModal({
				text: 'Удалить товар?',
				onConfirm: () => {
					dispatch(removeProductAsync(id)).then(() => {
						setShouldUpdateProductsList(!shouldUpdateProductsList);
						navigate('/admin-panel');
					});
					dispatch(CLOSE_MODAL);
				},
				onCancel: () => dispatch(CLOSE_MODAL),
			}),
		);
	};

	const isAdmin = checkAccess([ROLE.ADMIN], userRole);

	return (
		<div className={className}>
			{isAdmin && (
				<div className="buttons">
					{editButton}
					{price && (
						<Icon
							id="fa-trash-o"
							size="30px"
							margin="0  0 0 7px"
							color="#2c3e50"
							onClick={() => onProductRemove(id)}
						/>
					)}
				</div>
			)}
		</div>
	);
};

export const SpecialPanel = styled(SpecialPanelContaier)`
	display: flex;
	justify-content: space-between;
	margin: ${({ margin }) => margin};

	& .buttons {
		display: flex;
	}

	& i {
		position: relative;
		top: -1px;
	}
`;
