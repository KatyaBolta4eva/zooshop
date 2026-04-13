import { Button } from '../../../components';
import styled from 'styled-components';

const PaginationContainer = ({ className, page, lastPage, setPage }) => {
	return (
		<div className={className}>
			<Button disabled={page === 1} onClick={() => setPage(1)}>
				В начало
			</Button>
			<Button disabled={page === 1} onClick={() => setPage(page - 1)}>
				Предыдущая
			</Button>
			<div className="current-page">Страница: {page}</div>
			<Button disabled={page === lastPage} onClick={() => setPage(page + 1)}>
				Следующая
			</Button>
			<Button disabled={page === lastPage} onClick={() => setPage(lastPage)}>
				В конец
			</Button>
		</div>
	);
};

export const Pagination = styled(PaginationContainer)`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	padding: 20px 0;

	& button {
		margin: 0 5px;
	}

	& .current-page {
		margin: 0 5px;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 16px;
		height: 35px;
		padding: 0 24px;
		border: 1px solid #000;
		font-weight: 500;
		background-color: #f8f8f2;
		border-radius: 20px;
		border: 1px solid #d8d8d2;
		cursor: default;
		white-space: nowrap;
	}
`;
