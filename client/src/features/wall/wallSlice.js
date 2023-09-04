import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from "axios";


const initialState = {
	walls: [],
}

export const fetchWalls = createAsyncThunk(
	'walls/fetchWalls',
	async (_, {getState}) => {
		const {room} = getState()
		const url = `${process.env.REACT_APP_SERVER_URL}walls?floor=${room.currentFloor}`
		try {
			const response = await axios.get(url)
			return response.data
		} catch (e) {
			console.log('error', e.message)
		}
	}
)
export const wallSlice = createSlice({
	name: 'walls',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchWalls.fulfilled, (state, action) => {
			state.walls = action.payload
		})
	},

})

export default wallSlice.reducer