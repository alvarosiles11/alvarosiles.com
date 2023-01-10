import { SPage } from "servisofts-component";

import root from "./root";
import pasarela from "./pasarela";
import restaurante from "./restaurante";
export default SPage.combinePages("conciliacion",
    {
        "": root,
        ...pasarela,
        ...restaurante

    }
)