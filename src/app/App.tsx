import React, {useEffect} from "react";
import 'antd/dist/antd.min.css';
import './app.css';
import {Navigate, Route, Routes} from 'react-router-dom'
import { useSelector} from "react-redux";
import {AppRootStateType} from "./store";
import {RequestStatusType} from "./app-reducer";
import {Preloader} from "../assets/prealoder/Prealoder";
import {message} from "antd";
import routes from "../routes/routes";

export const App = React.memo(() => {


    const status = useSelector<AppRootStateType, RequestStatusType>((state) => state.app.status)
    const error = useSelector<AppRootStateType, string | null>((state) => state.app.error)


    useEffect(() => {
        status === 'failed' && message.error(error, 5)
        status === 'succeeded' && message.success('succeeded', 5)
    }, [status, error])


    return <>
        {status === 'loading' && <Preloader/>}
        <Routes>
            {routes.map(({auth, Component, path, access, planIds}, index) => {
                return <Route key={index} element={<Component/>} path={path}/>
            })}
            <Route path={'*'} element={<Navigate to={"/"}/>}/>
        </Routes>
    </>

})
