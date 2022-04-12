import React, {ChangeEventHandler, useEffect, useMemo, useState} from 'react'
import {Card, Image} from "antd";
import Meta from "antd/es/card/Meta";
import style from "./home.module.css"
import {FilterBar} from "../../components/FilterBar/FilterBar";
import {Header} from "../../components/Header/Header";
import {getProductsTC} from "../../reducers/productsReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../app/store";
import {CategoriesResponseType, ProductResponseType} from "../../types/app-api-types";
import {getCategoriesTC} from "../../reducers/categoriesReducer";
import {v1} from "uuid";
import {useNavigate} from "react-router-dom";
import {dumbImage} from "../../common/dumbImage";
import {NavigateButton} from "../../components/NavigateButton/NavigateButton";
import {PlusOutlined} from "@ant-design/icons";


export const Home = () => {
    const navigate = useNavigate()
    const [filterText, setFilterText] = useState("")
    const [selectValue, setSelectValue] = useState<null | string>(null)
    const products = useSelector<AppRootStateType, Array<ProductResponseType>>((state) => state.products.products)
    const categories = useSelector<AppRootStateType, Array<CategoriesResponseType>>((state) => state.categories.categories)
    const dispatch = useDispatch()

    const moveToProductById = (productId: number) => {
        navigate(`/product/${productId}`)
    }

    const onChangeSearchValue: ChangeEventHandler<HTMLInputElement> = (e) => {
        setFilterText(e.currentTarget.value)
    }

    const onChangeSelectValue = (value: string) => {
        setSelectValue(value)
    }

    let filteredProductList = useMemo(() => {
        let data: Array<ProductResponseType> = [...products];

        data = filterText && filterText.length ? data.filter(product => product.name.toLowerCase().includes(filterText.toLowerCase())) : data;
        data = selectValue && selectValue.length ? data.filter(product => product.category.toLowerCase().includes(selectValue.toLowerCase())) : data;

        return data
    }, [products, filterText, selectValue])


    useEffect(() => {
        dispatch(getProductsTC())
        dispatch(getCategoriesTC())
    }, [])

    return <div className={"container"}>
        <Header/>
        <FilterBar
            categories={categories}
            setSelectValue={onChangeSelectValue}
            selectValue={selectValue}
            filterText={filterText}
            onChangeSearchValue={onChangeSearchValue}
        />

        <div
            className={style.cards}
        >
            {
                filteredProductList.map(product => {
                    const moveToProduct = () => {
                        moveToProductById(+product.id)
                    }
                    return <Card
                        key={v1()}
                        className={style.product}
                        onClick={moveToProduct}
                        hoverable
                        style={{width: 240}}
                        cover={<Image alt={product.name}
                                      fallback={dumbImage}
                                      preview={false}
                                      src={product.avatar}/>}
                    >
                        <Meta title={product.name} description={`$ ${product.price}`}/>
                    </Card>
                })
            }

            <NavigateButton className={style.add_btn} icon={<PlusOutlined/>} url={"/create-product"}/>

        </div>
    </div>
}

