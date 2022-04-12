import React from "react";
import style from "./description-product.module.css";

type DescriptionProductPropsType = {
    description : string
}


export function DescriptionProduct(props:DescriptionProductPropsType) {
    return <div>
        <div className={style.price_description}>Description</div>
        <div className={style.price_text}>{props.description}</div>
    </div>;
}