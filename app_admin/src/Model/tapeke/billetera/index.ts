import { SModel } from "servisofts-model";
import Action from "./Action";
import Reducer from "./Reducer";

export default new SModel<Action, Reducer>({
    info: {
        component: "billetera"
    },
    Columns: {
        "key": { type: "text", pk: true },
        "key_usuario": { type: "text", fk: "usuario" },
        "fecha_on": { type: "timestamp", label: "Fecha de creacion" },
        "estado": { type: "integer" },
        "key_cliente": { type: "text", fk: "usuario" },
        "key_pedido": { type: "text", fk: "pedido" },
        "detalle": { type: "text" },
        "transaction_id": { type: "text" },
        "tipo_pago": { type: "text" },
        "monto": { type: "double" }
    },
    Action,
    Reducer,
});