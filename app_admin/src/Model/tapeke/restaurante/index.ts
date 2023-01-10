import { SModel } from "servisofts-model";
import Action from "./Action";
import Reducer from "./Reducer";

export default new SModel<Action, Reducer>({
    info: {
        component: "restaurante"
    },
    Columns: {
        "key": { type: "text", pk: true },
        "key_usuario": { type: "text", fk: "usuario" },
        "fecha_on": { type: "timestamp", label: "Fecha de creacion" },
        "estado": { type: "integer" },
        "nombre": { type: "text", editable: true },
        "descripcion": { type: "text", editable: true },
        "direccion": { type: "text", editable: true },
        // "foto_portada": { type: "text", editable: true },
        "latitude": { type: "double" },
        "longitude": { type: "double" },
        "delivery": { type: "boolean", editable: true },

    },
    image: {
        api: "root",
        name: "restaurante"
    },
    Action,
    Reducer,
});