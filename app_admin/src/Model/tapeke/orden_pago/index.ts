import { SModel } from "servisofts-model";
import Action from "./Action";
import Reducer from "./Reducer";

export default new SModel<Action, Reducer>({
    info: {
        component: "orden_pago"
    },
    Columns: {
        "key": { type: "text", pk: true },
        "key_usuario": { type: "text", fk: "usuario" },
        "fecha_on": { type: "timestamp", label: "Fecha de creacion" },
        "estado": { type: "integer" },
        "key_pedido": { type: "text", fk: "pedido" },
        "fecha_exp": { type: "text", },
        "data": { type: "json", },
        "type": { type: "text", },
        "checkout_currency": { type: "text" },
        "checkout_amout": { type: "double", },
        "comicion_pasarela": { type: "double" },
        "key_conciliacion_pasarela": { type: "text", },
    },
    Action,
    Reducer,
});