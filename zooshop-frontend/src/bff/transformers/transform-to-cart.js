export const transformToDbCartItem = (cartItem) => ({
    user_id: cartItem.userId,
    product_id: cartItem.productId,
    name: cartItem.name,
    price: cartItem.price,
    image_url: cartItem.imageUrl,
    quantity: cartItem.quantity,
});
