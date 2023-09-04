import {createSlice} from '@reduxjs/toolkit'
import {fetchSprites} from "./asyncActions";


const initialState = {
    sprites:[]
}


export const spriteSlice = createSlice({
    name: 'sprite',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchSprites.fulfilled, (state, action) => {
            state.sprites = action.payload
        })
    },
})

export default spriteSlice.reducer