import axios from "axios";
import baseURL from "../../../utils/baseURL";
import { resetErrAction, resetSuccessAction } from "../globalActions/globalAction";

const { createAsyncThunk, createSlice } = require("@reduxjs/toolkit");

//initalsState
const initialState = {
    reviews: [],
    review: null,
    loading: false,
    error: null,
    isAdded: false,
    isUpdated: false,
    isDelete: false,
};

//create review action
export const createReviewAction = createAsyncThunk(
    "review/create",
    async (
        { message, rating, id },
        { rejectWithValue, getState, dispatch }
    ) => {
        try {
            //Token - Authenticated
            const token = getState()?.users?.userAuth?.userInfo?.token;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const { data } = await axios.post(
                `${baseURL}/reviews/${id}`,
                {
                    message,
                    rating
                },
                config
            );
            return data;
        } catch (error) {
            return rejectWithValue(error?.response?.data);
        }
    }
);


const reviewsSlice = createSlice({
    name: "reviews",
    initialState,
    extraReducers: (builder) => {
        //create
        builder.addCase(createReviewAction.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(createReviewAction.fulfilled, (state, action) => {
            state.loading = false;
            state.review = action.payload;
            state.isAdded = true;
        });
        builder.addCase(createReviewAction.rejected, (state, action) => {
            state.loading = false;
            state.review = null;
            state.isAdded = false;
            state.error = action.payload;
        });


        //reset error action
        builder.addCase(resetErrAction.pending, (state, action) => {
            state.isAdded = false;
            state.error = null;
        });
        //reset success action
        builder.addCase(resetSuccessAction.pending, (state, action) => {
            state.isAdded = false;
            state.error = null;
        });





    },
});

//generate the reducer
const reviewsReducer = reviewsSlice.reducer;

export default reviewsReducer;