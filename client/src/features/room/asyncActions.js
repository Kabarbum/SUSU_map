import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {setCurrentFloor} from "./roomSlice";

export const searchRoom = createAsyncThunk(
	"rooms/searchRoom",
	async ({number, corpus}, {dispatch}) => {
		const _corpus = corpus
		const _number = number
		//проверка на букву в номере аудитории
		if (number.match(/\d+|\D+/g).length > 1) {
			number = number.slice(0, -1)
		}
		let _floor = number.slice(0, Math.floor(number.length / 2))
		const url = `${process.env.REACT_APP_SERVER_URL}rooms/search?corpus=${_corpus}&floor=${_floor}&number=${_number}`
		const response = await axios.get(url)
		if (!response)
			return;

		const room = response.data
		// search center of room
		const coords = {
			minX: Infinity,
			maxX: -Infinity,
			minZ: Infinity,
			maxZ: -Infinity,
		}
		room.walls.forEach(el => {
			// minX
			coords.minX = coords.minX > el.pointA[0] ? el.pointA[0] : coords.minX
			coords.minX = coords.minX > el.pointB[0] ? el.pointB[0] : coords.minX
			//minZ
			coords.minZ = coords.minZ > el.pointA[2] ? el.pointA[2] : coords.minZ
			coords.minZ = coords.minZ > el.pointB[2] ? el.pointB[2] : coords.minZ
			// maxX
			coords.maxX = coords.maxX < el.pointA[0] ? el.pointA[0] : coords.maxX
			coords.maxX = coords.maxX < el.pointB[0] ? el.pointB[0] : coords.maxX
			// maxZ
			coords.maxZ = coords.maxZ < el.pointA[2] ? el.pointA[2] : coords.maxZ
			coords.maxZ = coords.maxZ < el.pointB[2] ? el.pointB[2] : coords.maxZ
		})
		const target = [
			(coords.maxX + coords.minX) / 2,
			0,
			(coords.maxZ + coords.minZ) / 2
		]
		dispatch(setCurrentFloor(Number(_floor)));

		if (room)
			return {id: room.id, target}
		return null
	}
);

export const fetchRooms = createAsyncThunk(
	'rooms/fetchRooms',
	async (_, {getState}) => {
		const {room} = getState()
		try {
			const url = `${process.env.REACT_APP_SERVER_URL}rooms?floor=${room.currentFloor}`
			const response = await axios.get(url)
			return response.data
		} catch (e) {
			console.log('error', e.message)
		}
	}
)