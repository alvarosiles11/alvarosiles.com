import { SPage } from "servisofts-component";
import root from "./root";
import horario from "./horario";
import partners from "./partners";
import pedidos from "./pedidos";
export default SPage.combinePages("profile", {
    "": root,
    horario,
    partners,
    pedidos
})
