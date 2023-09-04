import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
	isAdmin: false,
	user: {},
};

export const validateAdmin = createAsyncThunk(
	"admin/validateAdmin",
	async (data, {dispatch}) => {
		dispatch(setUser(data));

		const url = `${process.env.REACT_APP_SERVER_URL}user/auth`;
		try {
			const response = await axios.post(url, data);
			return response.data;
		} catch (e) {
			console.log("error", e.message);
		}
	}
);
export const adminSlice = createSlice({
	name: "floors",
	initialState,
	reducers: {
		setUser: (state, action) => {
			state.user = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(validateAdmin.fulfilled, (state, action) => {
			state.isAdmin = action.payload || false;
		})
	},
})

export const {setUser} = adminSlice.actions

export default adminSlice.reducer
