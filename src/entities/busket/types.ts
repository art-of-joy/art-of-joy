import {Product} from "../product";

export interface Basket {
    products: Product_Basket[]
    totalPrice: number
    totalCount: number
}

export interface Product_Basket extends Product {
    count: number
}