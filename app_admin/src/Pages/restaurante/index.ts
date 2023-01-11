import { SPage } from "servisofts-component";
import Model from "../../Model";
import list from "./list";
import table from "./table";
import _new from "./new";
import profile from "./profile";
import edit from "./edit";
import _delete from "./delete";
import horario from "./horario";
import pack from "./pack";

const model = Model.restaurante;
export const Parent = {
    name: "restaurante",
    path: `/restaurante`,
    model
}
export default SPage.combinePages(Parent.name, {
    "": list,
    "list": list,
    "table": table,
    "new": _new,
    ...profile,
    "edit": edit,
    "delete": _delete,
    ...horario,
    ...pack
})