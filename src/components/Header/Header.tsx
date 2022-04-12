import React from "react";
import style from "./header.module.css";

export function Header() {
    return <div className={style.header}>
        <div>
            UPayments Store
        </div>
        <div>
            Register
        </div>
    </div>;
}