import { SStorage } from "servisofts-component";
import { SAction } from "servisofts-model";
import SSocket from 'servisofts-socket'
import Model from "../..";

export default class Action extends SAction {

    getPendientesConciliacion(extra?: {}) {
        return SSocket.sendPromise({
            ...this.model.info,
            type: "getPendientesConciliacion",
            key_usuario: Model.usuario.Action.getKey()
        })
    }
    getConciliadas(extra?: { key_conciliacion_pasarela: string }) {
        return SSocket.sendPromise({
            ...this.model.info,
            type: "getConciliadas",
            key_usuario: Model.usuario.Action.getKey(),
            ...extra
        })
    }
}