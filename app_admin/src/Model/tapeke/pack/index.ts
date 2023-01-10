import { SModel } from "servisofts-model";
import Action from "./Action";
import Reducer from "./Reducer";

export default new SModel<Action, Reducer>({
    info: {
        component: "pack"
    },
    Columns: {
        "key": { type: "text", pk: true },
        "key_usuario": { type: "text", fk: "usuario" },
        "fecha_on": { type: "timestamp", label: "Fecha de creacion" },
        "estado": { type: "integer" },
        "key_horario": { type: "text", fk: "horario" },
        "descripcion": { type: "text", editable: true },
        "precio": { type: "double", editable: true },
        "cantidad": { type: "integer", editable: true }
    },
    Action,
    Reducer,
});