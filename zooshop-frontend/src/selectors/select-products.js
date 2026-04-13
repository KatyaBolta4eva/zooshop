export const selectAllProducts = ({products}) => products?.products || [];
export const selectLastPage = ({products}) => products?.lastPage || 1;
