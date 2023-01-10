import { SModel } from "servisofts-model";
import Action from "./Action";
import Reducer from "./Reducer";

export default new SModel<Action, Reducer>({
    info: {
        component: "pago_tarjeta"
    },
    Columns: {
        "codigo_seguridad": { type: "text", editable: true },
        "ano": { type: "text", editable: true },
        "mes": { type: "text", editable: true },
        "numero_tarjeta": { type: "text", editable: true },
        "nombre": { type: "text", editable: true },
        "fecha_on": { type: "timestamp", label: "Fecha de registro" },
        "estado": { type: "integer" },
        "key_usuario": { type: "text", fk: "usuario" },
        "key": { type: "text", pk: true },
    },
    Action,
    Reducer,
});