import { SPage } from "servisofts-component";

import root from "./root";
import dato from "./dato";
import enviroment from "./enviroment";
import costo_envio from "./costo_envio";
export default SPage.combinePages("ajustes",
    {
        "": root,
        ...dato,
        ...enviroment,
        ...costo_envio

    }
)