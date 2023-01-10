import { SModel } from "servisofts-model";
import Action from "./Action";
import Reducer from "./Reducer";

export default new SModel<Action, Reducer>({
    info: {
        component: "horario"
    },
    Columns: {
        "key": { type: "text", pk: true },
        "key_usuario": { type: "text", fk: "usuario" },
        "fecha_on": { type: "timestamp", label: "Fecha de creacion" },
        "estado": { type: "integer" },
        "key_restaurante": { type: "text", fk: "restaurante" },
        "hora_inicio": { type: "text", editable: true },
        "hora_fin": { type: "text", editable: true },
        "dia": { type: "integer"},
        "porcentaje_comision": { type: "double", editable: true },
    },
    Action,
    Reducer,
});