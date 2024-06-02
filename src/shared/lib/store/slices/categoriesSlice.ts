import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Category, SubCategory} from "../../../../entities/category";

const initialState : Category[] = []

export const categoriesSlice = createSlice({
    name:"categoriesSlice",
    initialState,
    reducers:{
        addCategories: (state, action: PayloadAction<Category[]>) => {
            state.concat(action.payload);
        },
        addSupCategories: (state, action: PayloadAction<{categoryId: number, subCategory: SubCategory[]}>) => {
            const CategoryIndex = state.findIndex((category)=> {return category.id == action.payload.categoryId});
            if (CategoryIndex != -1) {
                state[CategoryIndex].subCategories.concat(action.payload.subCategory);
            } else {
                console.error(`Не найдена категория с id: ${action.payload.categoryId}`);
            }
        },
        setCategories: (state, action: PayloadAction<Category[]>) => {
            return action.payload;
        },
        setSupCategories: (state, action: PayloadAction<{categoryId: number, subCategory: SubCategory[]}>) => {
            const CategoryIndex = state.findIndex((category)=> {return category.id == action.payload.categoryId});
            if (CategoryIndex != -1) {
                state[CategoryIndex].subCategories = (action.payload.subCategory);
            } else {
                console.error(`Не найдена категория с id: ${action.payload.categoryId}`);
            }
        },
    }
})

export const {addCategories,addSupCategories,setCategories,setSupCategories} = categoriesSlice.actions
export default categoriesSlice.reducer
