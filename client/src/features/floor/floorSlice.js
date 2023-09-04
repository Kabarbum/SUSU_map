import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
	floors: [],
};

export const fetchFloors = createAsyncThunk(
	"floors/fetchFloors",
	async (_, {getState}) => {
		const {room} = getState();
		const url = `${process.env.REACT_APP_SERVER_URL}floors?floor=${room.currentFloor}`;
		try {
			const response = await axios.get(url);
			return response.data;
		} catch (e) {
			console.log("error", e.message);
		}
	}
);
export const floorSlice = createSlice({
	name: "floors",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchFloors.fulfilled, (state, action) => {
			state.floors = action.payload;
		});
	},
});

export default floorSlice.reducer;
