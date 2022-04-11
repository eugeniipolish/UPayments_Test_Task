import axios from "./axiosHelper";
import {CategoriesResponseType, ProductPostDataType, ProductResponseType} from "../types/app-api-types";


export const productsAPI = {
    getProducts() {
        return axios.get<Array<ProductResponseType>>(`/products`);
    },
    getProductById(id: number) {
        return axios.get<ProductResponseType>(`/products/${id}`);
    },
    addProduct(product: ProductPostDataType){
        return axios.post<ProductResponseType>(`/products`, product);
    },
    deleteProductById(id: number) {
        return axios.get(`/products/${id}`);
    }
}
export const categoriesAPI = {
    getCategories() {
        return axios.get<Array<CategoriesResponseType>>(`/categories`);
    },
    getCategoriesById(id: number) {
        return axios.get<CategoriesResponseType>(`/categories/${id}`);
    }
}

