import { useState } from 'react';
import styled from 'styled-components';

import image1 from '../../assets/images-carousel/cats.jpg';
import image2 from '../../assets/images-carousel/pudeli.jpg';
import image3 from '../../assets/images-carousel/pes.jpg';

const carouselImages = [image1, image2, image3];

export const Carousel = () => {
	const [currentIndex, setCurrentIndex] = useState(0);

	const goToPrev = () => {
		setCurrentIndex((prevIndex) =>
			prevIndex === 0 ? carouselImages.length - 1 : prevIndex - 1,
		);
	};

	const goToNext = () => {
		setCurrentIndex((prevIndex) =>
			prevIndex === carouselImages.length - 1 ? 0 : prevIndex + 1,
		);
	};

	const goToSlide = (index) => {
		setCurrentIndex(index);
	};

	return (
		<CarouselContainer>
			<SlidesContainer style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
				{carouselImages.map((image, index) => (
					<Slide key={index}>
						<img src={image} alt={`Slide ${index + 1}`} />
					</Slide>
				))}
			</SlidesContainer>

			<CarouselControls>
				<CarouselButton onClick={goToPrev}>&#10094;</CarouselButton>
				<CarouselButton onClick={goToNext}>&#10095;</CarouselButton>
			</CarouselControls>

			<DotsContainer>
				{carouselImages.map((_, index) => (
					<Dot
						key={index}
						$active={index === currentIndex}
						onClick={() => goToSlide(index)}
					/>
				))}
			</DotsContainer>
		</CarouselContainer>
	);
};

const CarouselContainer = styled.div`
	position: relative;
	max-width: 1200px;
	margin: 0 auto;
	overflow: hidden;
	border-radius: 10px;
`;

const SlidesContainer = styled.div`
	display: flex;
	transition: transform 0.5s ease-in-out;
`;

const Slide = styled.div`
	min-width: 100%;
	img {
		width: 100%;
		height: 400px;
		object-fit: cover;
		display: block;
	}
`;

const CarouselControls = styled.div`
	position: absolute;
	top: 50%;
	width: 100%;
	display: flex;
	justify-content: space-between;
	transform: translateY(-50%);
`;

const CarouselButton = styled.button`
	background-color: transparent;
	color: #a9a9a9;
	border: none;
	padding: 15px;
	cursor: pointer;
	font-size: 50px;
	transition: background-color 0.3s;
	&:hover {
		background-color: rgba(0, 0, 0, 0.1);
	}
`;

const DotsContainer = styled.div`
	position: absolute;
	bottom: 20px;
	width: 100%;
	display: flex;
	justify-content: center;
	gap: 10px;
`;

const Dot = styled.div`
	width: 12px;
	height: 12px;
	border-radius: 50%;
	background-color: ${(props) => (props.$active ? '#e3c89a;' : '#bbb')};
	cursor: pointer;
	transition: background-color 0.3s;
	&:hover {
		background-color: #555;
	}
`;
