import { SModel } from "servisofts-model";
import Action from "./Action";
import Reducer from "./Reducer";

export default new SModel<Action, Reducer>({
    info: {
        component: "costo_envio"
    },
    Columns: {
        "metro": { type: "integer", editable: true },
        "monto": { type: "double", editable: true },
        "fecha_on": { type: "timestamp", label: "Fecha de registro" },
        "estado": { type: "integer" },
        "key_usuario": { type: "text", fk: "usuario" },
        "key": { type: "text", pk: true },
    },
    Action,
    Reducer,
});