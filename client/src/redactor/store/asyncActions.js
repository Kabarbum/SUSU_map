import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {fetchRooms} from "features/room/asyncActions";
import {fetchWalls} from "features/wall/wallSlice";
import {fetchFloors} from "features/floor/floorSlice";
import {fetchSprites} from "features/sprite/asyncActions";

export const addRoom = createAsyncThunk(
	"redactor/addRoom",
	async (_, {getState, dispatch}) => {
		const {redactor, admin} = getState();
		const url = `${process.env.REACT_APP_SERVER_URL}rooms`;
		try {
			const response = await axios.post(url, {
				...redactor.room,
				...admin.user,
			});
			dispatch(fetchRooms());
			return response.data;
		} catch (e) {
			console.error("Frontend error:", e.message);
		}
	}
);
export const fetchSearchRoom = createAsyncThunk(
	"redactor/fetchSearchRoom",
	async (_, {getState}) => {
		const {redactor} = getState();
		const room = redactor.room;
		const url = `${process.env.REACT_APP_SERVER_URL}rooms/search?corpus=${room.corpus}&floor=${room.floor}&number=${room.number}`;
		try {
			const response = await axios.get(url);
			return response.data;
		} catch (e) {
			console.error("Frontend error:", e.message);
		}
	}
);
export const deleteRoom = createAsyncThunk(
	"redactor/deleteRoom",
	async (_, {getState, dispatch}) => {
		const {redactor, admin} = getState();
		const room = redactor.room;
		const url = `${process.env.REACT_APP_SERVER_URL}rooms/delete?corpus=${room.corpus}&floor=${room.floor}&number=${room.number}`;
		try {
			const response = await axios.post(url, {...admin.user});
			dispatch(fetchRooms());
			return response.data;
		} catch (e) {
			console.error("Frontend error:", e.message);
		}
	}
);
export const addWall = createAsyncThunk(
	"redactor/addWall",
	async (_, {getState, dispatch}) => {
		const {redactor, admin} = getState();
		const url = `${process.env.REACT_APP_SERVER_URL}walls`;
		try {
			const response = await axios.post(url, {
				...redactor.wall,
				...admin.user,
			});
			dispatch(fetchWalls());
			return response.data;
		} catch (e) {
			console.error("Frontend error:", e.message);
		}
	}
);
export const fetchOneWall = createAsyncThunk(
	"redactor/fetchOneWall",
	async (_, {getState}) => {
		const {redactor} = getState();
		const wall = redactor.wall;
		const url = `${process.env.REACT_APP_SERVER_URL}walls/one?floor=${
			wall.floor
		}&points=${JSON.stringify(wall.points)}`;
		try {
			const response = await axios.get(url);
			return response.data;
		} catch (e) {
			console.error("Frontend error:", e.message);
		}
	}
);
export const updateWall = createAsyncThunk(
	"redactor/updateWall",
	async (_, {getState, dispatch}) => {
		const {redactor, admin} = getState();
		const wall = redactor.wall;
		const url = `${process.env.REACT_APP_SERVER_URL}walls?id=${wall.id}`;
		try {
			await axios.put(url, {
				floor: wall.floor,
				points: wall.points,
				isPillarBefore: wall.isPillarBefore,
				isPillarAfter: wall.isPillarAfter,
				...admin.user,
			});
			dispatch(fetchWalls());
		} catch (e) {
			console.error("Frontend error:", e.message);
		}
	}
);
export const deleteWall = createAsyncThunk(
	"redactor/deleteWall",
	async (_, {getState, dispatch}) => {
		const {redactor, admin} = getState();
		const url = `${process.env.REACT_APP_SERVER_URL}walls/delete/${redactor.wall.id}`;
		try {
			await axios.post(url, {...admin.user});
			dispatch(fetchWalls());
		} catch (e) {
			console.error("Frontend error:", e.message);
		}
	}
);
export const addFloor = createAsyncThunk(
	"redactor/addFloor",
	async (_, {getState, dispatch}) => {
		const {redactor, admin} = getState();
		const url = `${process.env.REACT_APP_SERVER_URL}floors`;
		try {
			const response = await axios.post(url, {
				...redactor.floor,
				...admin.user,
			});
			dispatch(fetchFloors());
			return response.data;
		} catch (e) {
			console.error("Frontend error:", e.message);
		}
	}
);
export const fetchOneFloor = createAsyncThunk(
	"redactor/fetchOneFloor",
	async (_, {getState}) => {
		const {redactor} = getState();
		const floor = redactor.floor;
		const url = `${process.env.REACT_APP_SERVER_URL}floors/one?floor=${
			floor.floor
		}&points=${JSON.stringify(floor.points)}`;
		try {
			const response = await axios.get(url);
			return response.data;
		} catch (e) {
			console.error("Frontend error:", e.message);
		}
	}
);
export const updateFloor = createAsyncThunk(
	"redactor/updateFloor",
	async (_, {getState, dispatch}) => {
		const {redactor, admin} = getState();
		const floor = redactor.floor;
		const url = `${process.env.REACT_APP_SERVER_URL}floors?id=${floor.id}`;
		try {
			await axios.put(url, {
				floor: floor.floor,
				points: floor.points,
				...admin.user,
			});
			dispatch(fetchFloors());
		} catch (e) {
			console.error("Frontend error:", e.message);
		}
	}
);
export const deleteFloor = createAsyncThunk(
	"redactor/deleteFloor",
	async (_, {getState, dispatch}) => {
		const {redactor, admin} = getState();
		const url = `${process.env.REACT_APP_SERVER_URL}floors/delete/${redactor.floor.id}`;
		try {
			await axios.post(url, {...admin.user});
			dispatch(fetchFloors());
		} catch (e) {
			console.error("Frontend error:", e.message);
		}
	}
);
export const addSprite = createAsyncThunk(
	"redactor/addSprite",
	async (_, {getState, dispatch}) => {
		const {redactor, admin} = getState();
		const url = `${process.env.REACT_APP_SERVER_URL}sprites`;
		try {
			const response = await axios.post(url, {
				floor: redactor.sprite.floor,
				position: redactor.sprite.position,
				spriteTypeId: redactor.sprite.spriteTypeId,
				...admin.user,
			});
			dispatch(fetchSprites());
			return response.data;
		} catch (e) {
			console.error("Frontend error:", e.message);
		}
	}
);
export const fetchOneSprite = createAsyncThunk(
	"redactor/fetchOneSprite",
	async (_, {getState}) => {
		const {redactor} = getState();
		const sprite = redactor.sprite;
		const url = `${process.env.REACT_APP_SERVER_URL}sprites/one?floor=${
			sprite.floor
		}&position=${JSON.stringify(sprite.position)}`;
		try {
			const response = await axios.get(url);
			return response.data;
		} catch (e) {
			console.error("Frontend error:", e.message);
		}
	}
);
export const updateSprite = createAsyncThunk(
	"redactor/updateSprite",
	async (_, {getState, dispatch}) => {
		const {redactor, admin} = getState();
		const sprite = redactor.sprite;
		const url = `${process.env.REACT_APP_SERVER_URL}sprites?id=${sprite.id}`;
		try {
			await axios.put(url, {
				floor: sprite.floor,
				position: sprite.position,
				spriteTypeId: sprite.spriteTypeId,
				...admin.user,
			});
			dispatch(fetchSprites());
		} catch (e) {
			console.error("Frontend error:", e.message);
		}
	}
);
export const deleteSprite = createAsyncThunk(
	"redactor/deleteSprite",
	async (_, {getState, dispatch}) => {
		const {redactor, admin} = getState();
		const url = `${process.env.REACT_APP_SERVER_URL}sprites/delete/${redactor.sprite.id}`;
		try {
			await axios.post(url, {...admin.user});
			dispatch(fetchSprites());
		} catch (e) {
			console.error("Frontend error:", e.message);
		}
	}
);
export const addSpriteType = createAsyncThunk(
	"redactor/addSpriteType",
	async (_, {getState, dispatch}) => {
		const {redactor, admin} = getState();
		const url = `${process.env.REACT_APP_SERVER_URL}spriteTypes`;
		try {
			const formData = new FormData();
			formData.append("name", redactor.sprite_type.name);
			formData.append("img", redactor.sprite_type.img);
			formData.append("login", admin.user.login);
			formData.append("password", admin.user.password);
			const response = await axios.post(url, formData);
			dispatch(fetchSpriteTypes());
			return response.data;
		} catch (e) {
			console.error("Frontend error:", e.message);
		}
	}
);
export const fetchSpriteTypes = createAsyncThunk(
	"redactor/fetchSpriteTypes",
	async () => {
		const url = `${process.env.REACT_APP_SERVER_URL}spriteTypes`;
		try {
			const response = await axios.get(url);
			return response.data;
		} catch (e) {
			console.error("Frontend error:", e.message);
		}
	}
);
export const updateSpriteType = createAsyncThunk(
	"redactor/updateSpriteType",
	async (_, {getState, dispatch}) => {
		const {redactor, admin} = getState();
		const sprite_type = redactor.sprite_type;
		const url = `${process.env.REACT_APP_SERVER_URL}spriteTypes?id=${sprite_type.id}`;
		try {
			const formData = new FormData();
			formData.append("name", sprite_type.name);
			formData.append("img", sprite_type.img);
			formData.append("login", admin.user.login);
			formData.append("password", admin.user.password);

			await axios.put(url, formData);

			dispatch(fetchSpriteTypes());
		} catch (e) {
			console.error("Frontend error:", e.message);
		}
	}
);
export const deleteSpriteType = createAsyncThunk(
	"redactor/deleteSpriteType",
	async (id, {getState, dispatch}) => {
		const {admin} = getState();
		const url = `${process.env.REACT_APP_SERVER_URL}spriteTypes/delete/${id}`;
		try {
			await axios.post(url, {...admin.user});
			dispatch(fetchSpriteTypes());
		} catch (e) {
			console.error("Frontend error:", e.message);
		}
	}
);
