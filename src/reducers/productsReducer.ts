import {Dispatch} from "redux";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {ProductPostDataType, ProductResponseType} from "../types/app-api-types";
import {
    ActionsStatusType,
    setAppStatusAC,
} from "../app/app-reducer";
import {productsAPI} from "../api/app-api";

export type InitialStateType = {
    products: Array<ProductResponseType>
    chosenProduct: ProductResponseType | null
}

const initialState: InitialStateType = {
    products: [],
    chosenProduct: null
}

export const productsReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "SET-PRODUCTS":
            return {...state, products: action.products}
        case "ADD-PRODUCT":
            return {...state, products: [...state.products, action.product]}
        case "SET-ONE-PRODUCT":
            return {...state, chosenProduct: action.product}
        default:
            return state
    }
}


export const setProductsAC = (products: Array<ProductResponseType>) => ({
    type: 'SET-PRODUCTS',
    products
} as const)
export const setOneProductAC = (product: ProductResponseType | null) => ({
    type: 'SET-ONE-PRODUCT',
    product
} as const)
export const addProductAC = (product: ProductResponseType) => ({
    type: 'ADD-PRODUCT',
    product
} as const)


export const getProductsTC = () => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    return productsAPI.getProducts()
        .then((res) => {
            if (res.status === 200) {
                dispatch(setProductsAC(res.data));
                dispatch(setAppStatusAC('idle'))
                return true
            } else {
                handleServerAppError(res.data, dispatch)
                return false
            }
        }).catch((error) => {
            handleServerNetworkError(error, dispatch);
            return false
        })
}
export const getProductByIdTC = (id: number) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    return productsAPI.getProductById(id)
        .then((res) => {
            if (res.status === 200) {
                dispatch(setOneProductAC(res.data));
                dispatch(setAppStatusAC('idle'))
                return true
            } else {
                handleServerAppError(res.data, dispatch)
                return false
            }
        }).catch((error) => {
            handleServerNetworkError(error, dispatch);
            return false
        })
}
export const addProductsTC = (product: ProductPostDataType) => (dispatch: Dispatch<ActionsType>):Promise<boolean> => {
    dispatch(setAppStatusAC('loading'))
    return productsAPI.addProduct(product)
        .then((res) => {
            if (res.status === 201) {
                dispatch(addProductAC(res.data));
                dispatch(setAppStatusAC('succeeded'))
                return true
            } else {
                handleServerAppError(res.data, dispatch)
                return false
            }
        }).catch((error) => {
            handleServerNetworkError(error, dispatch);
            return false
        })
}

export type SetProductsActionType = ReturnType<typeof setProductsAC>
export type AddProductActionType = ReturnType<typeof addProductAC>
export type SetOneProductActionType = ReturnType<typeof setOneProductAC>


type ActionsType = AddProductActionType
    | SetProductsActionType
    | SetOneProductActionType
    | ActionsStatusType
