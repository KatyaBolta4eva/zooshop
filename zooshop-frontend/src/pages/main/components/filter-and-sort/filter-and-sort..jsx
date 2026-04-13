import { FilterButton } from '../../../../components';
import {
	categories,
	dietTypes,
	sortOptions,
} from './categories-config/categories-config';
import styled from 'styled-components';

const FiltersAndSortContainer = ({
	className,
	selectedCategory,
	selectedDietType,
	selectedSort,
	onCategoryChange,
	onDietTypeChange,
	onSortChange,
}) => {
	return (
		<div className={className}>
			<div className="filter-group">
				{categories.map(({ value, label }) => (
					<FilterButton
						key={value}
						className={selectedCategory === value ? 'active' : ''}
						onClick={() => onCategoryChange(value)}
					>
						{label}
					</FilterButton>
				))}
			</div>

			<div className="filter-group">
				{dietTypes.map(({ value, label }) => (
					<FilterButton
						key={value}
						className={selectedDietType === value ? 'active' : ''}
						onClick={() => onDietTypeChange(value)}
					>
						{label}
					</FilterButton>
				))}
			</div>

			<div className="filter-group">
				{sortOptions.map(({ value, label }) => (
					<FilterButton
						key={value}
						className={selectedSort === value ? 'active' : ''}
						onClick={() => onSortChange(value)}
					>
						{label}
					</FilterButton>
				))}
			</div>
		</div>
	);
};

export const FiltersAndSort = styled(FiltersAndSortContainer)`
	display: flex;
	flex-direction: column;
	gap: 15px;
	margin: 20px 0;
	padding: 20px;

	.filter-group {
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
	}
`;
