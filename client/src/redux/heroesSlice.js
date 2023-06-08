import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuid } from 'uuid';

export const heroesSlice = createSlice({
    name: "heroes",
    initialState:[],
    reducers:{
        addHero: (state, action)=>{
            const newHero = {
                id: uuid(),
                nickname: action.payload.hero,
                status: false
            }
            state.push(newHero);
        },
        deleteHero: (state, action)=>{
            return state.filter((item) => item.id !== action.payload.id);
        }
    }
});

export const {addHero, deleteHero} = heroesSlice.actions;

export default heroesSlice.reducer;