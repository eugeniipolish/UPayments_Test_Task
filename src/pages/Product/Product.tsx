import React, {useEffect} from 'react'
import style from "./product.module.css"
import {DescriptionProduct} from "../../components/DescriptionProduct/DescriptionProduct";
import {HeaderProduct} from "../../components/HeaderProduct/HeaderProduct";
import {Header} from "../../components/Header/Header";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getProductByIdTC, setOneProductAC} from "../../reducers/productsReducer";
import {AppRootStateType} from "../../app/store";
import {ProductResponseType} from "../../types/app-api-types";
import {NavigateButton} from "../../components/NavigateButton/NavigateButton";
import {ArrowLeftOutlined} from "@ant-design/icons";


export const Product = () => {
    const {id} = useParams()
    const product = useSelector<AppRootStateType, ProductResponseType | null>(state => state.products.chosenProduct)

    const dispatch = useDispatch()

    useEffect(() => {
        id && dispatch(getProductByIdTC(+id))
        return () => {
            dispatch(setOneProductAC(null))
        }
    }, [])

    return <div className={"container"}>
        {
            product && <div className={style.product}>
                <Header/>
                <NavigateButton className={style.add_btn} icon={<ArrowLeftOutlined/>} url={"/"}/>
                <HeaderProduct
                    title={product.name}
                    price={product.price}
                    imageURL={product.avatar}
                />
                <DescriptionProduct description={product.description}/>
            </div>
        }


    </div>
}