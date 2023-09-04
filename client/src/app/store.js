import {configureStore} from '@reduxjs/toolkit'
import roomReducer from "features/room/roomSlice";
import floorReducer from "features/floor/floorSlice";
import wallReducer from "features/wall/wallSlice";
import adminReducer from "features/admin/adminSlice";
import spriteReducer from "features/sprite/spriteSlice";
import redactorReducer from "redactor/store/redactorSlice";

const store = configureStore({
	reducer: {
		room: roomReducer,
		floor: floorReducer,
		wall: wallReducer,
		sprite: spriteReducer,
		redactor: redactorReducer,
		admin: adminReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				// Ignore these action types
				ignoredActions: ['redactor/setSpriteTypeImg'],
				// Ignore these field paths in all actions
				// ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
				// Ignore these paths in the state
				ignoredPaths: ['redactor.sprite_type.img'],
			},
		}),
})
export default store;