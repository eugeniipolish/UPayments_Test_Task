import React from "react";
import {Image} from "antd";
import style from "./header-product.module.css";
import {dumbImage} from "../../common/dumbImage";

type HeaderProductPropsType = {
    imageURL : string
    title : string
    price : string
}

export function HeaderProduct(props:HeaderProductPropsType) {
    return <div className={style.product_price}>
        <Image
            width={200}
            fallback={dumbImage}
            src={props.imageURL}
        />
        <div className={style.price}>
            <div className={style.price_title}>{props.title}</div>
            <div className={style.price_current}>$ {props.price}</div>
        </div>
    </div>;
}