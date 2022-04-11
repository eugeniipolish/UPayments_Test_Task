export type ProductResponseType = ProductPostDataType & {
    createdAt: string
    id: string
}
export type ProductPostDataType = {
    name: string
    price: string
    category: string
    description: string
    avatar: string
    developerEmail: string
}
export type CategoriesResponseType = {
    name: string
    createdAt: string
    id: string
}