import { SModel } from "servisofts-model";
import Action from "./Action";
import Reducer from "./Reducer";

export default new SModel<Action, Reducer>({
    info: {
        component: "conciliacion_pasarela"
    },
    Columns: {
        "key": { type: "text", pk: true },
        "key_usuario": { type: "text", fk: "usuario" },
        "fecha_on": { type: "timestamp", label: "Fecha de creacion" },
        "estado": { type: "integer" },
        "descripcion": { type: "text", },
        "fecha_cierre": { type: "date", label: "Conciliado hasta la fecha", editable: true },
        "total_pagado": { type: "double", editable: true },
    },
    Action,
    Reducer,
});