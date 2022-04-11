import {FC} from "react";
import {Home} from "../pages/Home/Home";




const routes: RoutesTypes = [

    {path: '/', Component: Home, auth:true  },

]



export default routes;
export type  RoutesTypes = Array<RoutesObjTypes>
export type  RoutesObjTypes = {
    path: string
    Component: FC
    auth?: boolean
    access?: Array<string>
    planIds?: Array<number>
}
