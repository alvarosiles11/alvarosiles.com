import { SPage } from "servisofts-component";

import root from "./root";
import novedades from "./novedades";
export default SPage.combinePages("marketing",
    {
        "": root,
        ...novedades

    }
)