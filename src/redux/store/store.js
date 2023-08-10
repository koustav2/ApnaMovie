import { configureStore } from "@reduxjs/toolkit";

import homeSlice from "../slice/globalSlice";



export const store = configureStore({
    reducer: {
        home: homeSlice,
    }
})