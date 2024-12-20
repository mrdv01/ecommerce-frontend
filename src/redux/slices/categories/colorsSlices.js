
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../../utils/baseURL";
import { resetErrAction, resetSuccessAction } from "../globalActions/globalAction";



//intital state

const initialState = {
    colors: [],
    color: {},
    loading: false,
    error: null,
    isAdded: false,
    isDeleted: false,
    isUpdated: false,
};

//create color action

export const createColorAction = createAsyncThunk('color/create', async (name, { rejectWithValue, getState, dispatch }) => {

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

        const { data } = await axios.post(`${baseURL}/colors`, {
            name,
        }, config);

        return data;



    } catch (error) {
        return rejectWithValue(error?.response?.data);

    }

})

//fetch color action
export const fetchColorsAction = createAsyncThunk('color/fetchall', async (payload, { rejectWithValue, getState, dispatch }) => {

    try {

        const { data } = await axios.get(`${baseURL}/colors`);

        return data;



    } catch (error) {
        return rejectWithValue(error?.response?.data);

    }

})

//delete color Action
export const deleteColorAction = createAsyncThunk('color/delete', async (id, { rejectWithValue, getState, dispatch }) => {

    try {
        //Token - authentication
        const token = getState()?.users?.userAuth?.userInfo?.token;
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const { data } = await axios.delete(`${baseURL}/colors/${id}`, config);

        return data;



    } catch (error) {
        return rejectWithValue(error?.response?.data);

    }

})
//create color slice

const colorsSlice = createSlice({
    name: 'colors',
    initialState,
    extraReducers: (builder) => {
        //create
        builder.addCase(createColorAction.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(createColorAction.fulfilled, (state, action) => {
            state.loading = false;
            state.color = action.payload;
            state.isAdded = true;
        });
        builder.addCase(createColorAction.rejected, (state, action) => {
            state.loading = false;
            state.color = null;
            state.isAdded = false;
            state.error = action.payload
        });
        //fetch all colors
        builder.addCase(fetchColorsAction.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchColorsAction.fulfilled, (state, action) => {
            state.loading = false;
            state.colors = action.payload;

        });
        builder.addCase(fetchColorsAction.rejected, (state, action) => {
            state.loading = false;
            state.colors = null;

            state.error = action.payload
        });
        //delete
        builder.addCase(deleteColorAction.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(deleteColorAction.fulfilled, (state, action) => {
            state.loading = false;

            state.isDelete = true;
        });
        builder.addCase(deleteColorAction.rejected, (state, action) => {
            state.loading = false;


            state.error = action.payload;
        });
        //reset error
        builder.addCase(resetErrAction.pending, (state, action) => {
            state.error = null;
        })
        //reset success
        builder.addCase(resetSuccessAction.pending, (state, action) => {
            state.isAdded = false;
        })
    },


});

//generate the reducer

const colorReducer = colorsSlice.reducer;

export default colorReducer;