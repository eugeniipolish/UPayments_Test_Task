import {Dispatch} from "redux";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {CategoriesResponseType} from "../types/app-api-types";
import {
    ActionsStatusType,
    setAppStatusAC,
} from "../app/app-reducer";
import {categoriesAPI} from "../api/app-api";

export type InitialStateType = {
    categories: Array<CategoriesResponseType>
}

const initialState: InitialStateType = {
    categories: []

}

export const categoriesReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "ADD-CATEGORIES":
            return {...state, categories: action.categories}
        default:
            return state
    }
}



export const setCategoriesAC = (categories: Array<CategoriesResponseType>) => ({
    type: 'ADD-CATEGORIES',
    categories
} as const)


export const getCategoriesTC = () => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    return categoriesAPI.getCategories()
        .then((res) => {
            if (res.status === 200) {
                dispatch(setCategoriesAC(res.data));
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

export type SetCategoriesACActionType = ReturnType<typeof setCategoriesAC>


type ActionsType = SetCategoriesACActionType
    | ActionsStatusType
