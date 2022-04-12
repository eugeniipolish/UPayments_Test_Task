import {Button} from "antd";
import React from "react";
import {useNavigate} from "react-router-dom";
import {Path} from "history";


type NavigateButtonPropsType = {
    url: string | Partial<Path>
    icon: JSX.Element
    className?: string
}

export function NavigateButton(props: NavigateButtonPropsType) {

    const navigate = useNavigate()

    const moveToCreateProduct = () => {

        navigate(props.url)
    }


    return <Button
        className={props.className}
        onClick={moveToCreateProduct}
    >
        {props.icon}
    </Button>;
}