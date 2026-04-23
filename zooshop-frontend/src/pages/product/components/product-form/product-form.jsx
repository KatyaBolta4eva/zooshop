import { useLayoutEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Icon, Input, SpecialPanel } from '../../../../components';
import { saveProductAsync, showToast } from '../../../../actions';
import styled from 'styled-components';

const ProductFormContainer = ({
	className,
	product: {
		id,
		name,
		category,
		imageUrl,
		feedType,
		dietType,
		price,
		weightKg,
		quantity,
		description,
	},
}) => {
	const [imageUrlValue, setImageUrlValue] = useState(imageUrl);
	const [nameValue, setNameValue] = useState(name);
	const [categoryValue, setCategoryValue] = useState(category);
	const [feedTypeValue, setFeedTypeValue] = useState(feedType);
	const [dietTypeValue, setDietTypeValue] = useState(dietType);
	const [priceValue, setPriceValue] = useState(price);
	const [weightKgValue, setWeightKgValue] = useState(weightKg);
	const [quantityValue, setQuantityValue] = useState(quantity);
	const [descriptionValue, setDescriptionValue] = useState(description);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	useLayoutEffect(() => {
		setImageUrlValue(imageUrl);
		setNameValue(name);
		setCategoryValue(category);
		setFeedTypeValue(feedType);
		setDietTypeValue(dietType);
		setPriceValue(price);
		setWeightKgValue(weightKg);
		setQuantityValue(quantity);
		setDescriptionValue(description);
	}, [
		imageUrl,
		name,
		category,
		feedType,
		dietType,
		price,
		weightKg,
		quantity,
		description,
	]);

	const onSave = () => {
		const cleanedDescription = descriptionValue.trim();

		dispatch(
			saveProductAsync(id, {
				imageUrl: imageUrlValue,
				name: nameValue,
				category: categoryValue,
				feedType: feedTypeValue,
				dietType: dietTypeValue,
				price: Number(priceValue),
				weightKg: weightKgValue,
				quantity: Number(quantityValue),
				description: cleanedDescription,
			}),
		).then(({ error, data }) => {
			if (error) {
				dispatch(showToast(result.error, 'error'));
				return;
			}

			if (data?.id) {
				dispatch(showToast('Товар успешно сохранён!', 'success'));
				navigate(`/product/${data.id}`);
			} else {
				dispatch(showToast('Ошибка при сохранении товара', 'error'));
			}
		});
	};

	const onImageChange = ({ target }) => setImageUrlValue(target.value);
	const onNameChange = ({ target }) => setNameValue(target.value);
	const onCategoryChange = ({ target }) => setCategoryValue(target.value);
	const onFeedTypeChange = ({ target }) => setFeedTypeValue(target.value);
	const onDietTypeChange = ({ target }) => setDietTypeValue(target.value);
	const onPriceChange = ({ target }) => setPriceValue(target.value);
	const onWeightKgChange = ({ target }) => setWeightKgValue(target.value);
	const onQuantityChange = ({ target }) => setQuantityValue(target.value);
	const onDescriptionChange = ({ target }) => setDescriptionValue(target.value);

	return (
		<div className={className}>
			<div className="save-panel">
				<SpecialPanel
					margin="20px 0"
					editButton={
						<Icon
							id="fa-floppy-o"
							size="30px"
							color="#2c3e50"
							margin="0 10px 0px 0 "
							onClick={onSave}
						/>
					}
				/>
			</div>
			<Input
				value={imageUrlValue}
				placeholder="Изображение..."
				onChange={onImageChange}
			/>
			<Input
				value={nameValue}
				placeholder="Название товара..."
				onChange={onNameChange}
			/>
			<Input
				value={categoryValue}
				placeholder="Категория товара (cat/dog)..."
				onChange={onCategoryChange}
			/>
			<Input
				value={feedTypeValue}
				placeholder="Тип корма (dry/wet)..."
				onChange={onFeedTypeChange}
			/>
			<Input
				value={dietTypeValue}
				placeholder="Тип диеты (regular/vet)..."
				onChange={onDietTypeChange}
			/>
			<Input
				value={priceValue}
				placeholder="Стоимость товара..."
				onChange={onPriceChange}
			/>
			<Input
				value={weightKgValue}
				placeholder="Вес товара..."
				onChange={onWeightKgChange}
			/>
			<Input
				value={quantityValue}
				placeholder="Количество на складе..."
				onChange={onQuantityChange}
			/>

			<textarea
				className="post-text"
				value={descriptionValue}
				onChange={onDescriptionChange}
				placeholder="Описание товара..."
				rows={10}
			/>
		</div>
	);
};

export const ProductForm = styled(ProductFormContainer)`
	& img {
		float: left;
		margin: 0 20px 10px 0;
	}

	& .save-panel {
		display: flex;
		justify-content: flex-end;
	}

	& .post-text {
		width: 100%;
		min-height: 80px;
		border: 2px solid #ddd;
		font-size: 18px;
		font-family: inherit;
		padding: 12px;
		resize: vertical;
		border-radius: 4px;
		line-height: 1.6;
		outline: none;
		box-sizing: border-box;
		border-radius: 20px;
		background-color: rgba(255, 255, 255, 0.3);
	}

	& .post-text:focus {
		box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
	}

	& input {
		width: 100%;
		height: 50px;
		padding: 0 16px;
		border: 2px solid #ddd;
		border-radius: 25px;
		font-size: 16px;
		outline: none;
		margin-bottom: 15px;
		transition: all 0.3s ease;
	}

	& input:focus {
		box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
		transform: translateY(-1px);
	}

	& i {
		&:hover {
			color: #795548;
		}
	}
`;
