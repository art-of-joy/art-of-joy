export interface Category {
    id: number
    name: string
}

export interface SubCategory {
    id: number
    name: string
    category_id: number
}