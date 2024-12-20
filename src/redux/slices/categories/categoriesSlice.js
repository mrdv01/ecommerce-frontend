
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../../utils/baseURL";
import { resetErrAction, resetSuccessAction } from "../globalActions/globalAction";


//intital state

const initialState = {
    categories: [],
    category: {},
    loading: false,
    error: null,
    isAdded: false,
    isDeleted: false,
    isUpdated: false,
};

//create category action

export const createCategoryAction = createAsyncThunk('category/create', async (payload, { rejectWithValue, getState, dispatch }) => {

    try {
        const { name, file } = payload;
        //form data
        const formData = new FormData();
        formData.append('name', name);
        formData.append('file', file);
        //Token - authentication
        const token = getState()?.users?.userAuth?.userInfo?.token;
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        //images

        const { data } = await axios.post(`${baseURL}/categories`, formData, config);

        return data;



    } catch (error) {
        return rejectWithValue(error?.response?.data);

    }

})

//update category action

export const updateCategoryAction = createAsyncThunk('category/update', async ({ name, id }, { rejectWithValue, getState, dispatch }) => {

    try {


        //Token - authentication
        const token = getState()?.users?.userAuth?.userInfo?.token;
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        //images

        const { data } = await axios.put(`${baseURL}/categories/${id}`, { name }, config);

        return data;



    } catch (error) {
        return rejectWithValue(error?.response?.data);

    }

})


//fetch category action
export const fetchCategoriesAction = createAsyncThunk('category/fetchall', async (payload, { rejectWithValue, getState, dispatch }) => {

    try {

        const { data } = await axios.get(`${baseURL}/categories`, {

        });

        return data;



    } catch (error) {
        return rejectWithValue(error?.response?.data);

    }

})

//fetch single category action
export const fetchCategoryAction = createAsyncThunk('category/fetch-single', async (id, { rejectWithValue, getState, dispatch }) => {

    try {

        const { data } = await axios.get(`${baseURL}/categories/${id}`, {

        });

        return data;



    } catch (error) {
        return rejectWithValue(error?.response?.data);

    }

})

//delete category action
export const deleteCategoriesAction = createAsyncThunk('category/delete', async (id, { rejectWithValue, getState, dispatch }) => {

    try {
        //Token - authentication
        const token = getState()?.users?.userAuth?.userInfo?.token;
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        const { data } = await axios.delete(`${baseURL}/categories/${id}`, config);

        return data;



    } catch (error) {
        return rejectWithValue(error?.response?.data);

    }

})
//create category slice

const categorySlice = createSlice({
    name: 'categories',
    initialState,
    extraReducers: (builder) => {
        //create
        builder.addCase(createCategoryAction.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(createCategoryAction.fulfilled, (state, action) => {
            state.loading = false;
            state.category = action.payload;
            state.isAdded = true;
        });
        builder.addCase(createCategoryAction.rejected, (state, action) => {
            state.loading = false;
            state.category = null;
            state.isAdded = false;
            state.error = action.payload
        });
        //update
        builder.addCase(updateCategoryAction.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(updateCategoryAction.fulfilled, (state, action) => {
            state.loading = false;
            state.category = action.payload;
            state.isUpdated = true;
        });
        builder.addCase(updateCategoryAction.rejected, (state, action) => {
            state.loading = false;
            state.category = null;
            state.isUpdated = false;
            state.error = action.payload
        });
        //fetch all categories
        builder.addCase(fetchCategoriesAction.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchCategoriesAction.fulfilled, (state, action) => {
            state.loading = false;
            state.categories = action.payload;

        });
        builder.addCase(fetchCategoriesAction.rejected, (state, action) => {
            state.loading = false;
            state.categories = null;

            state.error = action.payload
        });
        //fetch single category
        builder.addCase(fetchCategoryAction.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchCategoryAction.fulfilled, (state, action) => {
            state.loading = false;
            state.category = action.payload;

        });
        builder.addCase(fetchCategoryAction.rejected, (state, action) => {
            state.loading = false;
            state.category = null;

            state.error = action.payload
        });
        //delete
        builder.addCase(deleteCategoriesAction.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(deleteCategoriesAction.fulfilled, (state, action) => {
            state.loading = false;
            state.isDeleted = true;

        });
        builder.addCase(deleteCategoriesAction.rejected, (state, action) => {
            state.loading = false;


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

const categoryReducer = categorySlice.reducer;

export default categoryReducer;