import { SStorage } from "servisofts-component";
import { SAction } from "servisofts-model";
import SSocket from 'servisofts-socket'
import Model from "../..";

export default class Action extends SAction {

    getAll(extra?: {}) {
        return this.getAllActivos();
    }
    getPendientesConciliacion(extra?: { key_restaurante: string }) {
        return SSocket.sendPromise({
            ...this.model.info,
            type: "getPendientesConciliacion",
            key_usuario: Model.usuario.Action.getKey(),
            ...extra
        })
    }
    getConciliadas(extra?: { key_conciliacion_restaurante: string }) {
        return SSocket.sendPromise({
            ...this.model.info,
            type: "getConciliadas",
            key_usuario: Model.usuario.Action.getKey(),
            ...extra
        })
    }
    getAllActivos(extra?: {}) {
        var reducer = this._getReducer();
        const data = reducer?.data_activos;
        if (!data) {
            if (reducer.estado == "cargando") return null;
            const petition = {
                ...this.model.info,
                type: "getAllActivos",
                estado: "cargando",
                ...extra
            }
            SSocket.send(petition);
            return null;
        }
        return data;
    }
    getDetalle(key, reload) {
        var reducer = this._getReducer();
        var data = reducer.data_activos;
        if (data) {
            if (data[key]) {
                return data[key];
            }
        }
        if (reducer.estado == "cargando") return null;
        const petition = {
            ...this.model.info,
            type: "getDetalle",
            estado: "cargando",
            key_pedido: key,
            key_usuario: Model.usuario.Action.getKey()
        }
        SSocket.send(petition)
    }
}