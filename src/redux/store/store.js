import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/users/usersSlice";
import productReducer from "../slices/products/productsSlice";
import categoryReducer from "../slices/categories/categoriesSlice";
import brandReducer from "../slices/categories/brandsSlice";
import colorReducer from "../slices/categories/colorsSlices";
import cartReducer from "../slices/cart/cartSlices";
import couponsReducer from "../slices/coupons/couponsSlice";
import ordersReducer from "../slices/orders/ordersSlices";

import reviewsReducer from "../slices/reviews/reviewsSlice";




const store = configureStore({
    reducer: {
        users: userReducer,
        products: productReducer,
        categories: categoryReducer,
        brands: brandReducer,
        colors: colorReducer,
        carts: cartReducer,
        coupons: couponsReducer,
        orders: ordersReducer,
        reviews: reviewsReducer,
    }
})


export default store;