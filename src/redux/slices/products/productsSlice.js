
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../../utils/baseURL";
import { resetErrAction, resetSuccessAction } from "../globalActions/globalAction";


//intital state

const initialState = {
    products: [],
    product: {},
    loading: false,
    error: null,
    isAdded: false,
    isDeleted: false,
    isUpdated: false,
};

//create product action

export const createProductAction = createAsyncThunk('product/create', async (payload, { rejectWithValue, getState, dispatch }) => {

    try {
        console.log(payload);
        const { name, description, brand, category, colors, sizes, price, files, totalQty } = payload;
        //make request
        //Token - authentication
        const token = getState()?.users?.userAuth?.userInfo?.token;
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data"
            }
        }
        //FormData
        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("category", category);

        formData.append("brand", brand);
        formData.append("price", price);
        formData.append("totalQty", totalQty);

        sizes.forEach((size) => {
            formData.append("sizes", size);
        });
        colors.forEach((color) => {
            formData.append("colors", color);
        });

        files.forEach((file) => {
            formData.append("files", file);
        });


        const { data } = await axios.post(`${baseURL}/products`, formData, config);

        return data;



    } catch (error) {
        return rejectWithValue(error?.response?.data);

    }

})

//update product action

export const updateProductAction = createAsyncThunk('product/update', async (payload, { rejectWithValue, getState, dispatch }) => {

    try {
        console.log(payload);
        const { name, description, brand, category, colors, sizes, price, files, totalQty, id } = payload;
        //make request
        //Token - authentication
        const token = getState()?.users?.userAuth?.userInfo?.token;
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data"
            }
        }
        //FormData
        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("category", category);

        formData.append("brand", brand);
        formData.append("price", price);
        formData.append("totalQty", totalQty);

        sizes.forEach((size) => {
            formData.append("sizes", size);
        });
        colors.forEach((color) => {
            formData.append("colors", color);
        });

        files.forEach((file) => {
            formData.append("files", file);
        });


        const { data } = await axios.put(`${baseURL}/products/${id}`, formData, config);

        return data;



    } catch (error) {
        return rejectWithValue(error?.response?.data);

    }

})

// fetch products action

export const fetchProductsAction = createAsyncThunk('products/list', async ({ url }, { rejectWithValue, getState, dispatch }) => {
    console.log(url);
    try {



        const { data } = await axios.get(`${url}`);

        return data;



    } catch (error) {
        return rejectWithValue(error?.response?.data);

    }

})

//fetch product action
export const fetchProductAction = createAsyncThunk('product/list', async (productId, { rejectWithValue, getState, dispatch }) => {

    try {



        const { data } = await axios.get(`${baseURL}/products/${productId}`);

        return data;



    } catch (error) {
        return rejectWithValue(error?.response?.data);

    }

})



//create product slice

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        resetUpdateState: (state) => {
            state.isUpdated = false;
        },
    },
    extraReducers: (builder) => {
        //create
        builder.addCase(createProductAction.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(createProductAction.fulfilled, (state, action) => {
            state.loading = false;
            state.product = action.payload;
            state.isAdded = true;
        });

        builder.addCase(createProductAction.rejected, (state, action) => {
            state.loading = false;
            state.product = null;
            state.isAdded = false;
            state.error = action.payload
        });
        //update
        builder.addCase(updateProductAction.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(updateProductAction.fulfilled, (state, action) => {
            state.loading = false;
            state.product = action.payload;
            state.isUpdated = true;
        });

        builder.addCase(updateProductAction.rejected, (state, action) => {
            state.loading = false;
            state.product = null;
            state.isUpdated = false;
            state.error = action.payload
        });
        //fetch all
        builder.addCase(fetchProductsAction.pending, (state) => {
            state.loading = true;
            state.isAdded = false;
        });
        builder.addCase(fetchProductsAction.fulfilled, (state, action) => {
            state.loading = false;
            state.products = action.payload;
            state.isAdded = true;
        });

        builder.addCase(fetchProductsAction.rejected, (state, action) => {
            state.loading = false;
            state.products = null;
            state.isAdded = false;
            state.error = action.payload
        });
        //fetch single
        builder.addCase(fetchProductAction.pending, (state) => {
            state.loading = true;
            state.isAdded = false;
        });
        builder.addCase(fetchProductAction.fulfilled, (state, action) => {
            state.loading = false;
            state.product = action.payload;
            state.isAdded = true;
        });

        builder.addCase(fetchProductAction.rejected, (state, action) => {
            state.loading = false;
            state.product = null;
            state.isAdded = false;
            state.error = action.payload
        });
        //reset error
        builder.addCase(resetErrAction.pending, (state, action) => {
            state.error = null;
        })
        //reset success
        builder.addCase(resetSuccessAction.pending, (state, action) => {
            state.isAdded = false;
            state.isUpdated = false;
        })
    },


});

//generate the reducer

const productReducer = productSlice.reducer;

export const { resetUpdateState } = productSlice.actions;

export default productReducer;