import { SStorage } from "servisofts-component";
import { SAction } from "servisofts-model";
import SSocket from 'servisofts-socket'
import Model from "../..";

export default class Action extends SAction {

    editar(extra?: {}): Promise<unknown> {
        var key = Model.usuario.Action.getUsuarioLog().key
        console.log("kye", key)
        return super.editar({
            ...extra,
            key_usuario: key,

        });
    }
}