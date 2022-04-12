import {CategoriesResponseType} from "../../types/app-api-types";
import {Select} from "antd";
import style from "./category-select.module.css";
import {ucFirst} from "../../utils/ucFirst";
import React from "react";


type CategorySelectPropsType = {
    selectValue: string | null
    setSelectValue: (value: string) => void
    categories: Array<CategoriesResponseType>
}

export function CategorySelect(props: CategorySelectPropsType) {
    return <Select
        allowClear
        value={props.selectValue}
        onChange={props.setSelectValue}
        placeholder={"Categories"}
        className={style.select}
    >
        {
            props.categories.map(category => {
                return < Select.Option value={category.name.toLowerCase()}>{ucFirst(category.name)}</Select.Option>
            })
        }
    </Select>;
}