// action
// export const loadProductsAsync = () => (dispatch) =>
// 	request('api/products').then(({ data }) => {
// 		if (!data) {
// 			return { error: 'Нет данных' };
// 		}
// 		dispatch({ type: ACTION_TYPE.SET_ALL_PRODUCTS, payload: data.products });
// 		return { error: null };
// 	});

// reducer (productReducer frontend diplome)

// selectors

// admin-panel

// import { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { loadProductsAsync } from '../../actions';
// import { selectAllProducts } from '../../selectors';
// import {
// 	H2,
// 	H3,
// 	P,
// 	Button,
// 	Icon,
// 	SpecialPanel,
// 	PrivateContent,
// 	Loader,
// } from '../../components';
// import { ROLE } from '../../constants';
// import styled from 'styled-components';

// const AdminPanelContainer = ({ className }) => {
// 	const dispatch = useDispatch();
// 	const navigate = useNavigate();
// 	const [shouldUpdateProductsList, setShouldUpdateProductsList] = useState(false);
// 	const [isLoading, setIsLoading] = useState(true);

// 	const products = useSelector(selectAllProducts);

// 	useEffect(() => {
// 		setIsLoading(true);
// 		dispatch(loadProductsAsync()).finally(() => {
// 			setIsLoading(false);
// 		});
// 	}, [dispatch, shouldUpdateProductsList]);

// 	const onCreate = () => {
// 		navigate('/product');
// 	};

// 	const onEdit = (id) => {
// 		navigate(`/product/${id}/edit`);
// 	};

// 	if (isLoading) {
// 		return (
// 			<PrivateContent access={[ROLE.ADMIN]} serverError={null}>
// 				<div className={className}>
// 					<Loader />
// 				</div>
// 			</PrivateContent>
// 		);
// 	}

// 	return (
// 		<PrivateContent access={[ROLE.ADMIN]} serverError={null}>
// 			<div className={className}>
// 				<div className="header">
// 					<H2 color="#5D4037">Админ-панель</H2>
// 					<Button width="300px" onClick={onCreate}>
// 						+ Создать новый товар
// 					</Button>
// 				</div>

// 				<div className="products-list">
// 					{products.length === 0 ? (
// 						<P>Нет товаров</P>
// 					) : (
// 						products.map((product) => (
// 							<div key={product.id} className="product-item">
// 								<img
// 									className="product-image"
// 									src={product.imageUrl || ''}
// 									alt={product.name}
// 								/>
// 								<div className="product-details">
// 									<H3>{product.name}</H3>
// 									<P>{product.category}</P>
// 									<P fontWeight="bold" color="#5D4037">
// 										{product.price} ₽
// 									</P>
// 								</div>
// 								<SpecialPanel
// 									id={product.id}
// 									price={product.price}
// 									shouldUpdateProductsList={shouldUpdateProductsList}
// 									setShouldUpdateProductsList={
// 										setShouldUpdateProductsList
// 									}
// 									editButton={
// 										<Icon
// 											id="fa-pencil"
// 											margin="0 10px 0px 0"
// 											color="#2c3e50"
// 											size="30px"
// 											onClick={() => onEdit(product.id)}
// 										/>
// 									}
// 								/>
// 							</div>
// 						))
// 					)}
// 				</div>
// 			</div>
// 		</PrivateContent>
// 	);
// };

// export const AdminPanel = styled(AdminPanelContainer)`
// 	padding: 20px;

// 	& .header {
// 		display: flex;
// 		justify-content: space-between;
// 		align-items: center;
// 		margin-bottom: 30px;
// 	}

// 	& .products-list {
// 		display: flex;
// 		flex-direction: column;
// 		gap: 20px;
// 	}

// 	& .product-item {
// 		display: flex;
// 		align-items: center;
// 		padding: 16px;
// 		background: white;
// 		border-radius: 12px;
// 		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
// 	}

// 	& .product-image {
// 		width: 60px;
// 		height: 60px;
// 		object-fit: cover;
// 		border-radius: 8px;
// 		margin-right: 16px;
// 	}

// 	& .product-details {
// 		flex: 1;
// 	}

// 	& .product-details h3 {
// 		margin: 0 0 8px 0;
// 		font-size: 18px;
// 	}

// 	& i {
// 		&:hover {
// 			color: #795548;
// 		}
// 	}
// `;

// style pagination

// export const Pagination = styled(PaginationContainer)`
// 	display: flex;
// 	justify-content: center;
// 	position: absolute;
// 	bottom: 140px;
// 	width: 100%;
// 	margin: 0 0 20px;
// 	padding: 0 35px;

// 	& button {
// 		margin: 0 5px;
// 	}

// 	& .current-page {
//         margin: 0 5px;
//         display: flex;
//         justify-content: center;
//         align-items: center;
//         font-size: 16px;
//         height: 35px;
//         padding: 0 24px;
//         border: 1px solid #000;
//         font-weight: 500;
//         background-color: #F8F8F2;
//         border-radius: 20px;
// 		border: 1px solid #D8D8D2;
//         cursor: default;
// 		white-space: nowrap;
//     }
// `;

// 2 вариант стилизации

// export const Pagination = styled(PaginationContainer)`
// 	display: flex;
// 	justify-content: center;
// 	position: relative;
// 	width: 100%;
// 	margin: 30px 0 20px;
// 	padding: 0 35px;

// 	& button {
// 		margin: 0 5px;
// 	}

// 	& .current-page {
//         margin: 0 5px;
//         display: flex;
//         justify-content: center;
//         align-items: center;
//         font-size: 16px;
//         height: 35px;
//         padding: 0 24px;
//         border: 1px solid #000;
//         font-weight: 500;
//         background-color: #F8F8F2;
//         border-radius: 20px;
// 		border: 1px solid #D8D8D2;
//         cursor: default;
// 		white-space: nowrap;
//     }
// `;

// get list with search, filters and pagination

// async function getProducts(
// 	search = "",
// 	limit = 10,
// 	page = 1,
// 	category = "all",
// 	dietType = "all"
//   ) {
// 	const filter = {
// 	  name: { $regex: search, $options: "i" },
// 	};

// 	if (category !== "all") {
// 	  filter.category = category;
// 	}

// 	if (dietType !== "all") {
// 	  filter.diet_type = dietType;
// 	}

// 	const [products, count] = await Promise.all([
// 	  Product.find(filter)
// 		.limit(limit)
// 		.skip((page - 1) * limit)
// 		.sort({ createdAt: -1 }),
// 	  Product.countDocuments(filter),
// 	]);

// 	return {
// 	  products,
// 	  lastPage: Math.ceil(count / limit),
// 	};
//   }

// oформить ошибки

// if (error) {
// 	 return Promise.reject(error);
// 			}

// 	 dispatch(setCartItems(data));
// 	 return { error: null };






// Текущий вариант (.then/.catch)
// const handleCheckout = () => {
// 	setIsOperating(true);
// 	dispatch(checkoutAsync())
// 	  .then(() => navigate('/order-confirmation'))
// 	  .catch((error) => dispatch(showToast(error.message, 'error')))
// 	  .finally(() => setIsOperating(false));
//   };

  // Альтернатива (async/await + try/catch)
//   const handleCheckout = async () => {
// 	setIsOperating(true);
// 	try {
// 	  await dispatch(checkoutAsync());
// 	  navigate('/order-confirmation');
// 	} catch (error) {
// 	  dispatch(showToast(error.message, 'error'));
// 	} finally {
// 	  setIsOperating(false);
// 	}
//   };



  // Уменьшаем quantity товара на складе
  // for (const item of cart.items) {
  //   const currentQty = Number(item.product_id.quantity) || 0;
  //   const orderedQty = item.quantity;

  //   await Product.findByIdAndUpdate(item.product_id._id, {
  //     quantity: currentQty - orderedQty,
  //   });
  // }



// обработка ошибки

//   export const checkoutAsync = () => (dispatch) =>
// 	request('/api/orders', 'POST').then(({ error }) => {
// 		if (error) {
// 			throw new Error(error);
// 		}
// 		dispatch(setCartItems([]));
// 	});


// const handleCheckout = () => {
// 	setIsOperating(true);
// 	dispatch(checkoutAsync())
// 	  .then(() => navigate('/order-confirmation'))
// 	  .catch((error) => {
// 		dispatch(showToast(error.message, 'error'));
// 	  })
// 	  .finally(() => setIsOperating(false));
//   };



// function findCartItem(cart, productId) {
//   return cart.items.find((item) => {
//     const itemProductId = item.product_id._id
//       ? item.product_id._id.toString()
//       : item.product_id.toString();
//     return itemProductId === productId;
//   });
// }

// function filterOutProduct(cart, productId) {
//   return cart.items.filter((item) => {
//     const itemProductId = item.product_id._id
//       ? item.product_id._id.toString()
//       : item.product_id.toString();
//     return itemProductId !== productId;
//   });
// }
