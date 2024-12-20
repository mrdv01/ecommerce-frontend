
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../../utils/baseURL";
import { resetErrAction, resetSuccessAction } from "../globalActions/globalAction";


//intital state

const initialState = {
    brands: [],
    brand: {},
    loading: false,
    error: null,
    isAdded: false,
    isDeleted: false,
    isUpdated: false,
};

//create brand action

export const createBrandAction = createAsyncThunk('brand/create', async (name, { rejectWithValue, getState, dispatch }) => {

    try {

        //make request
        //Token - authentication
        const token = getState()?.users?.userAuth?.userInfo?.token;
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        //images

        const { data } = await axios.post(`${baseURL}/brands`, {
            name,
        }, config);

        return data;



    } catch (error) {
        return rejectWithValue(error?.response?.data);

    }

})

//fetch brand action
export const fetchBrandsAction = createAsyncThunk('brand/fetchall', async (payload, { rejectWithValue, getState, dispatch }) => {

    try {

        const { data } = await axios.get(`${baseURL}/brands`, {

        });

        return data;



    } catch (error) {
        return rejectWithValue(error?.response?.data);

    }

})
//delete brand Action
export const deleteBrandsAction = createAsyncThunk('brand/delete', async (id, { rejectWithValue, getState, dispatch }) => {

    try {
        //Token - authentication
        const token = getState()?.users?.userAuth?.userInfo?.token;
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const { data } = await axios.delete(`${baseURL}/brands/${id}`, config);

        return data;



    } catch (error) {
        return rejectWithValue(error?.response?.data);

    }

})


//create brand slice

const brandSlice = createSlice({
    name: 'brands',
    initialState,
    extraReducers: (builder) => {
        //create
        builder.addCase(createBrandAction.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(createBrandAction.fulfilled, (state, action) => {
            state.loading = false;
            state.brand = action.payload;
            state.isAdded = true;
        });
        builder.addCase(createBrandAction.rejected, (state, action) => {
            state.loading = false;
            state.brand = null;
            state.isAdded = false;
            state.error = action.payload
        });
        //fetch all brands
        builder.addCase(fetchBrandsAction.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchBrandsAction.fulfilled, (state, action) => {
            state.loading = false;
            state.brands = action.payload;

        });
        builder.addCase(fetchBrandsAction.rejected, (state, action) => {
            state.loading = false;
            state.brands = null;

            state.error = action.payload
        });
        //delete
        builder.addCase(deleteBrandsAction.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(deleteBrandsAction.fulfilled, (state, action) => {
            state.loading = false;

            state.isDelete = true;
        });
        builder.addCase(deleteBrandsAction.rejected, (state, action) => {
            state.loading = false;


            state.error = action.payload;
        });

        //reset error
        builder.addCase(resetErrAction.pending, (state, action) => {
            state.isAdded = false;
            state.error = null;
        })
        //reset success
        builder.addCase(resetSuccessAction.pending, (state, action) => {
            state.isAdded = false;
            state.error = null;
        })
    },


});

//generate the reducer

const brandReducer = brandSlice.reducer;

export default brandReducer;