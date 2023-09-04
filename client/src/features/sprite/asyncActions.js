import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSprites = createAsyncThunk(
	'sprite/fetchSprites',
	async (_, {getState}) => {
		const {room} = getState()
		const url = `${process.env.REACT_APP_SERVER_URL}sprites?floor=${room.currentFloor}`
		try {
			const response = await axios.get(url)
			return response.data
		} catch (e) {
			console.log('error', e.message)
		}
	}
)