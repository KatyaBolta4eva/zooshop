import { useEffect, useState } from 'react';
import styled from 'styled-components';

const FooterContainer = ({ className }) => {
	const [city, setCity] = useState('');
	const [temperature, setTemperature] = useState('');
	const [windSpeed, setWindSpeed] = useState('');

	useEffect(() => {
		fetch(
			'https://api.open-meteo.com/v1/forecast?latitude=55.75&longitude=37.625&current=temperature_2m,wind_speed_10m&hourly=temperature_2m',
		)
			.then((response) => response.json())
			.then((data) => {
				if (data.latitude === 55.75 && data.longitude === 37.625) {
					setCity('Москва');
				} else {
					setCity(
						`Город неизвестен, широта: ${data.latitude}, долгота: ${data.longitude}`,
					);
				}
				setTemperature(Math.round(data.current.temperature_2m));
				setWindSpeed(data.current.wind_speed_10m);
			})
			.catch((error) => {
				console.error('Не удалось получить погоду:', error);
			});
	}, []);

	return (
		<div className={className}>
			<div>
				<div>Интернет-магазин кормов премум-класса</div>
				<div>У КОТА</div>
			</div>
			<div>
				<div>
					{city},{' '}
					{new Date().toLocaleString('ru', { day: 'numeric', month: 'long' })}
				</div>
				<div>
					{temperature} °C, скорость ветра {windSpeed} км/ч
				</div>
			</div>
		</div>
	);
};

export const Footer = styled(FooterContainer)`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	height: 120px;
	padding: 20px 40px;
	font-weight: bold;
	background-color: #f8f2ed;
	box-shadow: 0px -5px 20px rgba(255, 140, 0, 0.15);

	& > div {
		color: #8b4513;
		font-size: 14px;
	}
`;
