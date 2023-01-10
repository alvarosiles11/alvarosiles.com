import { SModel } from "servisofts-model";
import Action from "./Action";
import Reducer from "./Reducer";

export default new SModel<Action, Reducer>({
    info: {
        service: "empresa",
        component: "sucursal"
    },
    Columns: {
        "key": { type: "text", pk: true },
        "descripcion": { type: "text", notNull: true, editable: true },
        "observacion": { type: "text", editable: true },
        "fecha_on": { type: "timestamp" },
        "estado": { type: "integer" },
        "key_empresa": { type: "text", fk: "empresa", notNull:true },
        "key_usuario": { type: "text", fk: "usuario" },
        "direccion": { type: "text", editable: true },
        "lat": { type: "double", editable: true },
        "lng": { type: "double", editable: true },
    },
    image: {
        api: "empresa",
        name: "sucursal"
    },
    Action,
    Reducer,
});