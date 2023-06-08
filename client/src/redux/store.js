import { configureStore } from "@reduxjs/toolkit";
import heroReducer from "./heroesSlice";

export default configureStore({
    reducer:{
        heroes: heroReducer,
    }
});