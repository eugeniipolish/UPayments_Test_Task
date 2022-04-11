import {Dispatch} from "redux";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {ProductResponseType} from "../types/app-api-types";
import {
    ActionsStatusType,
    SetAppErrorActionType,
    setAppStatusAC,
    SetAppStatusActionType,
    setIsInitializedACType
} from "../app/app-reducer";
import {productsAPI} from "../api/app-api";

export type InitialStateType = {
    products: Array<ProductResponseType>
}

const initialState: InitialStateType = {
    products: []

}

export const productsReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "SET-PRODUCTS":
            return {...state, products: action.products}
        default:
            return state
    }
}


export const setProductsAC = (products: Array<ProductResponseType>) => ({
    type: 'SET-PRODUCTS',
    products
} as const)


export const getUserProfileTC = () => (dispatch: Dispatch<ActionsType>) => {
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


export type SetProductsACActionType = ReturnType<typeof setProductsAC>


type ActionsType = SetProductsACActionType
    | ActionsStatusType
