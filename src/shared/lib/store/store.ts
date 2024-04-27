import { configureStore } from '@reduxjs/toolkit';
import { uiSlice } from './slices/uiSlice';
import {userSlice} from "./slices/userSlice";
import {backetSlice} from './slices/basketSlice';
import { categoriesSlice } from "./slices/categoriesSlice";

export const store = configureStore({
    reducer: {
        ui: uiSlice.reducer,
        user: userSlice.reducer,
        basket: backetSlice.reducer,
        category: categoriesSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // Отключаем проверку на сериализуемость
        }),
    devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;

