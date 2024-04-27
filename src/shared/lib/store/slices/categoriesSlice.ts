import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Category, SubCategory} from "../../../../entities/category";

export interface CategoriesSliceinitialState {
    Categories: Category []
    SubCategories: SubCategory []
}

const initialState : CategoriesSliceinitialState = {
    Categories: [],
    SubCategories: [],
}



export const categoriesSlice = createSlice({
    name:"categoriesSlice",
    initialState,
    reducers:{
        addCategories: (state, action: PayloadAction<Category[]>) => {
            state.Categories.concat(action.payload)
        },
        addSupCategories: (state, action: PayloadAction<SubCategory[]>) => {
            state.SubCategories.concat(action.payload)
        },
        setCategories: (state, action: PayloadAction<Category[]>) => {
            state.Categories = action.payload
        },
        setSupCategories: (state, action: PayloadAction<SubCategory[]>) => {
            state.SubCategories = action.payload
        },
    }
})

export const {addCategories,addSupCategories,setCategories,setSupCategories} = categoriesSlice.actions
export default categoriesSlice.reducer
