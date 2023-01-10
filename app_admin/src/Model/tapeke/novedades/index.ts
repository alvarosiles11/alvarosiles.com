import { SModel } from "servisofts-model";
import Action from "./Action";
import Reducer from "./Reducer";

export default new SModel<Action, Reducer>({
    info: {
        component: "novedades"
    },
    Columns: {
        "descripcion": { type: "text", editable: true },
        "titulo": { type: "text", editable: true },
        "fecha": { type: "date", editable: true },
        "fecha_on": { type: "timestamp", label: "Fecha de registro" },
        "estado": { type: "integer" },
        "key_usuario": { type: "text", fk: "usuario" },
        "key": { type: "text", pk: true },
    },
    image: {
        api: "root",
        name: "novedades"
    },
    Action,
    Reducer,
});