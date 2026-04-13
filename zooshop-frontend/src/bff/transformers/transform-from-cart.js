export const transformCartItem = (dbCartItem) => ({
    id: dbCartItem.product_id,
    name: dbCartItem.name,
    price: Number(dbCartItem.price) || 0,
    imageUrl: dbCartItem.image_url,
    quantity: dbCartItem.quantity,
    cartItemId: dbCartItem.id,
    userId: dbCartItem.user_id,
});
