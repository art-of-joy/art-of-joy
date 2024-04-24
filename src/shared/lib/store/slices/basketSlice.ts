import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Basket} from "../../../../entities/busket";
import {Product_Basket} from "../../../../entities/busket/types";



const initialState:Basket= {
    products: [],
    totalPrice: 0,
    totalCount: 0
}


export const backetSlice = createSlice({
    name:"backetSlice",
    initialState,
    reducers:{
        addProduct: (state, action: PayloadAction<Product_Basket>) => {

            const index_product = state.products.findIndex((Product) => {
                return Product.id === action.payload.id
            });

            if(index_product != -1) {
                state.products[index_product].count++
            }
            else {
                state.products.push(action.payload);
            }
            state.totalCount++
            state.totalPrice+=action.payload.price
        },
        deleteProduct: (state, action: PayloadAction<Product_Basket>) => {
            const index_product = state.products.findIndex((Product) => {
                return Product.id === action.payload.id
            });
            if (index_product != -1) {
                state.products.splice(index_product, 1)
                state.totalCount--
                state.totalPrice-=action.payload.price
            }

        },
    }
})

export const {addProduct,deleteProduct} = backetSlice.actions
export default backetSlice.reducer

