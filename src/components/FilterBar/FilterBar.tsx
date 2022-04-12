import style from "./filterbar.module.css";
import {Input} from "antd";
import React, {ChangeEventHandler} from "react";
import {CategoriesResponseType} from "../../types/app-api-types";
import {CategorySelect} from "../CategorySelect/CategorySelect";

type FilterBarPropsType = {
    categories: Array<CategoriesResponseType>
    setSelectValue: (value: string) => void
    onChangeSearchValue: ChangeEventHandler<HTMLInputElement>
    filterText: string
    selectValue: string | null
}

export function FilterBar(props: FilterBarPropsType) {

    return <div className={style.filter}>
        <Input
            value={props.filterText}
            onChange={props.onChangeSearchValue}
            placeholder={"Search"}
            className={style.search}
        />
        <CategorySelect
            selectValue={props.selectValue}
            setSelectValue={props.setSelectValue}
            categories={props.categories}
        />
    </div>;
}