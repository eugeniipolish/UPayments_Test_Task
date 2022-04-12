import React, {useEffect} from 'react'
import style from "./create-product.module.css"

import {Button, Form, Input, InputNumber, Select} from "antd";
import {Header} from "../../components/Header/Header";
import {NavigateButton} from "../../components/NavigateButton/NavigateButton";
import {ArrowLeftOutlined} from "@ant-design/icons";
import {addProductsTC} from "../../reducers/productsReducer";
import {useDispatch, useSelector} from "react-redux";
import {CategoriesResponseType, ProductPostDataType} from "../../types/app-api-types";
import {useNavigate} from "react-router-dom";
import {ucFirst} from "../../utils/ucFirst";
import {AppRootStateType} from "../../app/store";
import {getCategoriesTC} from "../../reducers/categoriesReducer";
import {v1} from "uuid";


type SubmitDataType = {
    category: string
    description: string
    image: string
    name: string
    price: number
}

export const CreateProduct = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const categories = useSelector<AppRootStateType, Array<CategoriesResponseType>>((state) => state.categories.categories)


    const validateMessages = {
        required: '${label} is required!',
    };
    const onFinish = async (values: SubmitDataType) => {
        const newProduct: ProductPostDataType = {
            name: values.name,
            price: `${values.price}`,
            category: values.category,
            description: values.description,
            avatar: values.image,
            developerEmail: "eugeniipolish@gmail.com"
        }
        const response = await dispatch(addProductsTC(newProduct))
        if (response as unknown as boolean) {
            navigate("/")
        }
    };
    const parser = (value: string | undefined) => {
        return value ? value.replace(/\$\s?|(,*)/g, '') : ""
    }
    const formatter = (value: string | undefined) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')


    useEffect(() => {
        dispatch(getCategoriesTC())
    }, [])

    return <div className={"container"}>
        <Header/>
        <NavigateButton className={style.add_btn} icon={<ArrowLeftOutlined/>} url={"/"}/>
        <div className={style.form}>
            <div className={style.form_title}>Create Product</div>
            <Form name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
                <Form.Item name={"name"} rules={[{required: true}]}>
                    <Input
                        placeholder={"Product name"}
                        className={style.input}
                    />
                </Form.Item>
                <Form.Item name={"description"} rules={[{required: true}]}>
                    <Input.TextArea
                        placeholder={"Description"}
                        className={style.input}
                    />

                </Form.Item>
                <Form.Item name={"image"}>
                    <Input
                        placeholder={"Image URL"}
                        className={style.input}
                    />
                </Form.Item>
                <Form.Item name={"category"} rules={[{required: true}]}>
                    <Select
                        allowClear
                        className={style.input}
                        placeholder={"Categories"}
                    >
                        {
                            categories.map(category => {
                                return < Select.Option
                                    key={v1()}
                                    value={category.name.toLowerCase()}>
                                    {ucFirst(category.name)}
                                </Select.Option>
                            })
                        }
                    </Select>
                </Form.Item>
                <Form.Item name={"price"} rules={[{required: true}]}>
                    <InputNumber
                        formatter={formatter}
                        parser={parser}
                        placeholder={"Price"}
                        className={style.input}/>
                </Form.Item>
                <Form.Item>
                    <Button className={style.button} type="primary" htmlType="submit">
                        SUBMIT
                    </Button>
                </Form.Item>
            </Form>
        </div>
    </div>
}

