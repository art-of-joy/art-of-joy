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

            const { id, price } = action.payload

            const index_product = state.products.findIndex((Product) => {
                return Product.id === id
            });

            if(index_product != -1) {
                state.products[index_product].count++
            }
            else {
                state.products.push(action.payload);
            }
            state.totalCount++
            if(price != undefined) {
                state.totalPrice+= price
            }
            else {
                console.error(`У товара с id: ${id} Значение поля Price: Не указано.`)
            }
        },
        deleteProduct: (state, action: PayloadAction<Product_Basket>) => {

            const { id, price } = action.payload

            const index_product = state.products.findIndex((Product) => {
                return Product.id === id
            });
            if (index_product != -1) {
                state.products.splice(index_product, 1)
                state.totalCount--
                if(price != undefined) {
                    state.totalPrice-= price
                }
                else {
                    console.error(`У товара с id: ${id} Значение поля Price: Не указано.`)
                }
            }

        },
    }
})

export const {addProduct,deleteProduct} = backetSlice.actions
export default backetSlice.reducer

