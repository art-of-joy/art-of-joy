export interface Product {
    id: number
    name?: string
    description?: string
    price?: number
    image?: string
    article?: string
    article_wb?: string
    subcategory_id?: number
    brand_id?: number
    barcode?: string
    material?: string
    fragility?: boolean
    product_country?: string
    color?: string
    created_at: string
    height?: number
    width?: number
    size?: string
    ru_size?: string
    product_group_id?: number
}