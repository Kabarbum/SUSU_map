import {createSlice} from '@reduxjs/toolkit'
import {
	deleteFloor,
	deleteSprite,
	deleteWall,
	fetchOneFloor,
	fetchOneSprite,
	fetchOneWall,
	fetchSearchRoom,
	fetchSpriteTypes,
	updateFloor,
	updateSprite,
	updateWall
} from "./asyncActions";


const initialState = {
	elements: [
		{name: "Аудитория", value: "room"},
		{name: "Стена", value: "wall"},
		{name: "Пол", value: "floor"},
		{name: "Спрайт", value: "sprite"},
		{name: "Тип спрайтов", value: "sprite_type"},
	],
	type: "default",
	sprite: {
		id: '',
		floor: 1,
		position: [-123, 1, -338],
		spriteTypeId: 2,
		sprite_type: {
			img: `sprite_blank.png`
		}
	},
	sprite_type: {
		id: '',
		name: '',
		img: `sprite_blank.png`
	},
	spriteTypes: [],
	wall: {
		id: '',
		floor: 1,
		points: {
			pointA: [-123, 0, -336],
			pointB: [-123, 0, -340]
		},
		isPillarBefore: false,
		isPillarAfter: false
	},
	floor: {
		id: '',
		floor: 1,
		points: {
			pointA: [-123, 0, -336],
			pointB: [-130, 0, -340]
		}
	},
	room: {
		corpus: '1',
		floor: 1,
		number: "100",
		walls: [
			{pointA: [-123, 0, -337], pointB: [-123, 0, -336], isAdjasent: false},
			{pointA: [-123, 0, -336], pointB: [-126, 0, -336], isAdjasent: true},
			{pointA: [-126, 0, -336], pointB: [-126, 0, -340], isAdjasent: false},
			{pointA: [-126, 0, -340], pointB: [-123, 0, -340], isAdjasent: true},
			{pointA: [-123, 0, -340], pointB: [-123, 0, -339], isAdjasent: false}
		],
		wallColor: "#2589d2",
		floorColor: "#5b9fd2"
	}
}

const doRotate = (value, arr) => {
	// [1,0,2] [2,2]
	const x = value[0] - arr[0]
	const y = value[2] - arr[1]
	value[0] = arr[0] - y
	value[2] = x + arr[1]

}
export const redactorSlice = createSlice({
	name: 'redactor',
	initialState,
	reducers: {
		setType: (state, action) => {
			state.type = action.payload
		},
		setFloor: (state, action) => {
			switch (state.type) {
				case 'room':
					state.room.floor = Number(action.payload)
					break;
				case 'wall':
					state.wall.floor = Number(action.payload)
					break;
				case 'floor':
					state.floor.floor = Number(action.payload)
					break;
				case 'sprite':
					state.sprite.floor = Number(action.payload)
					break;
				default:
					return
			}
		},

		// ROOM
		setRoomNumber: (state, action) => {
			state.room.number = action.payload
		},
		setRoomCorpus: (state, action) => {
			state.room.corpus = action.payload
		},
		setRoomWallAdjasent: (state, action) => {
			state.room.walls[action.payload[0]].isAdjasent = action.payload[1]
		},
		setRoomCoordinates: (state, action) => {
			const arr = action.payload
			if (!isNaN(arr[3])) {
				state.room.walls[arr[0]][arr[1]][arr[2]] = Number(arr[3])
			}
		},
		addRoomCeil: (state, action) => {
			const pos = action.payload
			const walls = state.room.walls
			if (pos >= 0) {
				walls.splice(pos, 0, {
					pointA: walls[pos].pointA,
					pointB: walls[pos].pointB,
					isAdjasent: false,
				})
			} else {
				walls.push({
					pointA: walls[walls.length - 1].pointB,
					pointB: walls[walls.length - 1].pointB,
					isAdjasent: false,
				})
			}

		},
		deleteRoomCeil: (state, action) => {
			state.room.walls.splice(action.payload, 1)
		},

		// WALL
		setWallCoordinates: (state, action) => {
			const arr = action.payload
			if (!isNaN(action.payload[2])) {
				state.wall.points[arr[0]][arr[1]] = Number(arr[2])
			}
		},
		setPillarBefore: (state, action) => {
			state.wall.isPillarBefore = action.payload
		},
		setPillarAfter: (state, action) => {
			state.wall.isPillarAfter = action.payload
		},
		movePointAToPointB: (state) => {
			const varB = [...state.wall.points.pointB]
			const gapX = state.wall.points.pointB[0] - state.wall.points.pointA[0]
			const gapZ = state.wall.points.pointB[2] - state.wall.points.pointA[2]
			state.wall.points.pointB[0] += gapX
			state.wall.points.pointB[2] += gapZ
			state.wall.points.pointA = varB
		},

		// FLOOR
		setFloorCoordinates: (state, action) => {
			const arr = action.payload
			if (!isNaN(arr[2])) {
				state.floor.points[arr[0]][arr[1]] = Number(arr[2])
			}
		},

		// SPRITE
		setSpriteCoordinates: (state, action) => {
			const arr = action.payload
			if (!isNaN(arr[1])) {
				state.sprite.position[arr[0]] = Number(arr[1])
			}
		},
		setSpriteTypeId: (state, action) => {
			state.sprite.spriteTypeId = Number(action.payload)
			const data = [...state.spriteTypes.filter(el => el.id === state.sprite.spriteTypeId)]

			state.sprite.sprite_type.img = data[0].img
		},

		// SPRITE TYPE
		setSpriteType: (state, action) => {
			state.sprite_type = {
				...action.payload,
				img: ''
			}
		},
		setSpriteTypeName: (state, action) => {
			state.sprite_type.name = action.payload
		},
		setSpriteTypeImg: (state, action) => {
			state.sprite_type.img = action.payload
		},

		changeCoordinates: (state, action) => {
			let arr
			switch (state.type) {
				case 'room':
					arr = state.room.walls
					break;
				case 'wall':
					arr = [state.wall.points]
					break;
				case 'floor':
					arr = [state.floor.points]
					break;
				case 'sprite':
					arr = state.sprite.position
					break;
				default:
					break;
			}
			switch (action.payload) {
				case 'x+':
					if (state.type === 'sprite') {
						arr[0] += 1
						break;
					}
					arr.forEach(el => {
						el.pointA[0] += 1
						el.pointB[0] += 1
					})
					break;
				case 'x-':
					if (state.type === 'sprite') {
						arr[0] -= 1
						break;
					}
					arr.forEach(el => {
						el.pointA[0] -= 1
						el.pointB[0] -= 1
					})
					break;
				case 'z+':
					if (state.type === 'sprite') {
						arr[2] += 1
						break;
					}
					arr.forEach(el => {
						el.pointA[2] += 1
						el.pointB[2] += 1
					})
					break;
				case 'z-':
					if (state.type === 'sprite') {
						arr[2] -= 1
						break;
					}
					arr.forEach(el => {
						el.pointA[2] -= 1
						el.pointB[2] -= 1
					})
					break;
				default:
					break;
			}
		},
		doRotation: (state) => {
			let arr
			switch (state.type) {
				case 'room':
					arr = state.room.walls
					break;
				case 'wall':
					arr = [state.wall.points]
					break;
				case 'floor':
					arr = [state.floor.points]
					break;
				default:
					return
			}
			// [[1,0,2],[-1,0,3]]
			const [baseX, , baseZ] = arr[0].pointA
			arr.forEach(el => {
				doRotate(el.pointA, [baseX, baseZ])
				doRotate(el.pointB, [baseX, baseZ])
			})
		},
	},
	extraReducers: (builder) => {
		// ROOM
		builder.addCase(fetchSearchRoom.fulfilled, (state, action) => {
			if (action.payload)
				state.room.walls = action.payload.walls
		})

		// SPRITE
		builder.addCase(fetchSpriteTypes.fulfilled, (state, action) => {
			state.spriteTypes = action.payload
		})
		builder.addCase(fetchOneSprite.fulfilled, (state, action) => {
			if (action.payload !== null)
				state.sprite = action.payload
		})
		builder.addCase(updateSprite.fulfilled, (state) => {
			state.sprite.id = ''
		})
		builder.addCase(deleteSprite.fulfilled, (state) => {
			state.sprite.id = ''
		})

		// WALL
		builder.addCase(fetchOneWall.fulfilled, (state, action) => {
			if (action.payload !== null)
				state.wall = action.payload
		})
		builder.addCase(updateWall.fulfilled, (state) => {
			state.wall.id = ''
		})
		builder.addCase(deleteWall.fulfilled, (state) => {
			state.wall.id = ''
		})

		// FLOOR
		builder.addCase(fetchOneFloor.fulfilled, (state, action) => {
			if (action.payload !== null)
				state.floor = action.payload
		})
		builder.addCase(updateFloor.fulfilled, (state) => {
			state.floor.id = ''
		})
		builder.addCase(deleteFloor.fulfilled, (state) => {
			state.floor.id = ''
		})

	},

})
export const {
	setType,
	setRoomNumber,
	setFloor,
	setRoomCorpus,
	setRoomWallAdjasent,
	setWallCoordinates,
	setPillarBefore,
	setPillarAfter,
	movePointAToPointB,
	setFloorCoordinates,
	setSpriteCoordinates,
	setRoomCoordinates,
	changeCoordinates,
	doRotation,
	setSpriteTypeId,
	setSpriteTypeName,
	setSpriteTypeImg,
	addRoomCeil,
	deleteRoomCeil,
	setSpriteType
} = redactorSlice.actions

export default redactorSlice.reducer