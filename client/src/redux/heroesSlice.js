import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuid } from 'uuid';

export const heroesSlice = createSlice({
    name: "heroes",
    initialState: [],
    reducers: {
        addHero: (state, action) => {
            const newHero = {
                ...action.payload,
                id: action.payload.id ? action.payload.id : uuid(),
            }
            state.push(newHero);
        },
        updateHero: (state, action) => {
            const heroIndex = state.findIndex(item => item.id === action.payload.id)
            const updatedHero = action.payload
            return [
                ...state.slice(0, heroIndex),
                updatedHero,
                ...state.slice(heroIndex + 1)
            ]
        },
        deleteHero: (state, action) => {
            return state.filter((item) => item.id !== action.payload.id);
        }
    }
});

export const { addHero, updateHero, deleteHero } = heroesSlice.actions;

export default heroesSlice.reducer;