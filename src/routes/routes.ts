import {FC} from "react";
import {CreateProduct} from "../pages/CreateProduct/CreateProduct";
import {Product} from "../pages/Product/Product";
import {Home} from "../pages/Home/Home";




const routes: RoutesTypes = [

    {path: '/create-product', Component: CreateProduct },
    {path: '/product/:id', Component: Product },
    {path: '/', Component: Home  },

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
