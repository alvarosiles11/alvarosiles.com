import { SModel } from "servisofts-model";
import Action from "./Action";
import Reducer from "./Reducer";

export default new SModel<Action, Reducer>({
    info: {
        service: "empresa",
        component: "empresa"
    },
    Columns: {
        "key": { type: "text", pk: true },
        "nit": { type: "text", editable: true, label: "NIT" },
        "razon_social": { type: "text", editable: true, label: "Razon social" },
        "fecha_on": { type: "timestamp", label: "Fecha de registro" },
        "estado": { type: "integer" },
        "key_servicio": { type: "text", fk: "servicio" },
        "key_usuario": { type: "text", fk: "usuario" },

    },
    image: {
        api: "empresa",
        name: "empresa"
    },
    Action,
    Reducer,
});