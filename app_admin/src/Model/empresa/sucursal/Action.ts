import { SAction } from "servisofts-model";
import Model from "../..";
export default class Action extends SAction {
    getAll() {
        var empresa: any = Model.empresa.Action.getSelect();
        if (!empresa) return null;
        return this.getAllByKeyEmpresa(empresa.key)
    }
    getAllByKeyEmpresa(key_empresa) {
        // var empresa: any = Model.empresa.Action.getSelect();
        // if (!empresa) return null;
        var reducer = this._getReducer();
        if (reducer.key_empresa != key_empresa) {
            reducer.data = "";
            reducer.key_empresa = key_empresa;
        }

        var resp = super.getAll({
            key_empresa: key_empresa,
            key_usuario: Model.usuario.Action.getKey()
        })
        return resp;
    }
}   