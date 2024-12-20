import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'; // Import functions from Redux Toolkit for creating async actions and slices
import axios from 'axios'; // Import Axios for making HTTP requests
import baseURL from '../../../utils/baseURL.js'; // Import the base URL for your API
import { resetErrAction } from '../globalActions/globalAction.js';

// Initial state for the user slice
const initialState = { // Fixed the typo here
    loading: false, // Indicates if a request is in progress
    error: null, // Holds any error messages
    users: [], // Array to hold user data
    user: null, // Object to hold data for a single user
    profile: {}, // Object for user profile data
    userAuth: { // Sub-state for handling user authentication
        loading: false, // Indicates if the login request is in progress
        error: null, // Holds any authentication errors
        userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null, // Object to hold authenticated user information
    }
}

//registration action
export const registerUserAction = createAsyncThunk(
    'user/register', // Action type
    async ({ email, password, fullname }, { rejectWithValue }) => { // Destructure email and password from arguments
        try {
            // Make an HTTP POST request to log in the user
            const { data } = await axios.post(`${baseURL}/user/register`, {
                email,
                password,
                fullname,
            });

            return data; // Return the user data upon successful login
        } catch (error) {
            console.log(error)
            // If an error occurs, use rejectWithValue to return a custom error message
            return rejectWithValue(error?.response?.data);
        }
    }
);

//update user shipping address action
export const updateUserShippingAddressAction = createAsyncThunk(
    'user/update-shipping-address', // Action type
    async ({ firstName, lastName, address, city, country, postalCode, province, phone }, { rejectWithValue, getState }) => { // Destructure email and password from arguments
        try {
            // Make an HTTP POST request to log in the user
            //Token - authentication
            const token = getState()?.users?.userAuth?.userInfo?.token;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,

                }
            }
            const { data } = await axios.post(`${baseURL}/user/update/shipping`, {
                firstName, lastName, address, city, country, postalCode, province, phone
            }, config);

            return data; // Return the user data upon successful login
        } catch (error) {
            console.log(error)
            // If an error occurs, use rejectWithValue to return a custom error message
            return rejectWithValue(error?.response?.data);
        }
    }
);

//user profile action
export const getUserProfileAction = createAsyncThunk(
    "users/profile-fetched",
    async (payload, { rejectWithValue, getState, dispatch }) => {
        try {
            //get token
            const token = getState()?.users?.userAuth?.userInfo?.token;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const { data } = await axios.get(`${baseURL}/user/profile`, config);
            return data;
        } catch (error) {
            console.log(error);
            return rejectWithValue(error?.response?.data);
        }
    }
);

//logout user profile action
export const logoutAction = createAsyncThunk(
    "users/profile-logout",
    async (payload, { rejectWithValue, getState, dispatch }) => {


        localStorage.removeItem("userInfo")
        return true;

    }
);


// Login action - Asynchronous thunk for logging in users
export const loginUserAction = createAsyncThunk(
    'user/login', // Action type
    async ({ email, password }, { rejectWithValue }) => { // Destructure email and password from arguments
        try {
            // Make an HTTP POST request to log in the user
            const { data } = await axios.post(`${baseURL}/user/login`, {
                email,
                password,
            });
            //save the user into localstorage
            localStorage.setItem('userInfo', JSON.stringify(data));
            return data; // Return the user data upon successful login
        } catch (error) {
            console.log(error)
            // If an error occurs, use rejectWithValue to return a custom error message
            return rejectWithValue(error?.response?.data);
        }
    }
);

// User slice - Handles user-related state
const userSlice = createSlice({
    name: 'users', // Name of the slice
    initialState, // Use the corrected initial state here
    extraReducers: (builder) => { // Handle async actions in the slice
        // When the login request is pending
        builder.addCase(loginUserAction.pending, (state) => {
            state.userAuth.loading = true; // Set loading to true
        });

        // When the login request is fulfilled
        builder.addCase(loginUserAction.fulfilled, (state, action) => {
            state.userAuth.userInfo = action.payload; // Store user info from the action payload
            state.userAuth.loading = false; // Set loading to false
            state.userAuth.error = null; // Clear any previous error
        });

        // When the login request is rejected
        builder.addCase(loginUserAction.rejected, (state, action) => {
            state.userAuth.error = action.payload; // Store the error message
            state.userAuth.loading = false; // Set loading to false
        });
        //register
        builder.addCase(registerUserAction.pending, (state) => {
            state.loading = true; // Set loading to true
        });


        builder.addCase(registerUserAction.fulfilled, (state, action) => {
            state.user = action.payload; // Store user info from the action payload
            state.loading = false; // Set loading to false
        });


        builder.addCase(registerUserAction.rejected, (state, action) => {
            state.error = action.payload; // Store the error message
            state.loading = false; // Set loading to false
        });

        //logout
        builder.addCase(logoutAction.fulfilled, (state, action) => {
            state.userAuth.userInfo = null// Store user info from the action payload

        });
        //update address
        builder.addCase(updateUserShippingAddressAction.pending, (state) => {
            state.loading = true; // Set loading to true
        });


        builder.addCase(updateUserShippingAddressAction.fulfilled, (state, action) => {
            state.user = action.payload; // Store user info from the action payload
            state.loading = false; // Set loading to false
        });


        builder.addCase(updateUserShippingAddressAction.rejected, (state, action) => {
            state.error = action.payload; // Store the error message
            state.loading = false; // Set loading to false
        });

        //profile
        builder.addCase(getUserProfileAction.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(getUserProfileAction.fulfilled, (state, action) => {
            state.profile = action.payload;
            state.loading = false;
        });
        builder.addCase(getUserProfileAction.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
        });

        //reset error action
        builder.addCase(resetErrAction.pending, (state) => {
            state.error = null;
            state.userAuth.error = null
        })

        //reset success action
    }
});

// Generate the reducer from the slice
const userReducer = userSlice.reducer;

// Export the reducer for use in the Redux store
export default userReducer;
