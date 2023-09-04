import {createSlice} from '@reduxjs/toolkit'
import {fetchRooms, searchRoom} from "./asyncActions";


const normalWallColor = "#2589d2"
const normalFloorColor = "#5b9fd2"
const hoveredWallColor = "#1f72af"
const hoveredFloorColor = "#4e88b4"
const clickedWallColor = "#e822f2"
const clickedFloorColor = "#e844f0"

const initialState = {
	target: [-108, 0, -335],
	rooms: [],
	wallWidth: 0.1,
	wallHeight: 0.3,
	
	currentFloor: 1,
	totalFloors: 10,
	
	isFloorChanging: false,

	searchRoomId: 34,
	isSearchRoomIdChanged: false,
	roomsId: -1,//уникальынй идентификатор смены аудиторий. Нужен для установки искомой аудитории
}

export const roomSlice = createSlice({
	name: 'rooms',
	initialState,
	reducers: {
		setColorNormal: (state, action) => {
			const id = action.payload || state.searchRoomId
			const room = state.rooms.find(el => el.id === id)
			if (room){
				room.wallColor = normalWallColor
				room.floorColor = normalFloorColor
			}
		},
		setColorHovered: (state, action) => {
			const room = state.rooms.find(el => el.id === action.payload)
			room.wallColor = hoveredWallColor
			room.floorColor = hoveredFloorColor
		},
		setColorClicked: (state, action) => {
			const room = state.rooms.find(el => el.id === action.payload)
			room.wallColor = clickedWallColor
			room.floorColor = clickedFloorColor
		},
		setCurrentFloor: (state, action) => {
			state.currentFloor = action.payload
		},
		setSearchedRoom: (state) => {
			const room = state.rooms.find(el => el.id === state.searchRoomId)
			if(room) {
				room.wallColor = '#f1bd51'
				room.floorColor = '#f0c978'
				state.isSearchRoomIdChanged = false
			}
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchRooms.fulfilled, (state, action) => {
			state.rooms = action.payload
			state.roomsId = state.currentFloor
		})
		builder.addCase(searchRoom.fulfilled, (state, action) => {
			if (action.payload) {
				state.target = action.payload.target
				state.searchRoomId = action.payload.id
				state.isSearchRoomIdChanged = true
			}
		})
	},
	
})

export const {
	setColorNormal,
	setColorClicked,
	setColorHovered,
	setCurrentFloor,
	setSearchedRoom
} = roomSlice.actions

export default roomSlice.reducer