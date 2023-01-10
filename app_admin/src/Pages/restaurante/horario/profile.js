import DPA, { connect } from 'servisofts-page';
import { Parent } from "."
import { SHr, SList, SLoad, SText, SView } from 'servisofts-component';
import Model from '../../../Model';

class index extends DPA.profile {
    constructor(props) {
        super(props, {
            Parent: Parent,
            excludes: ["key", "key_usuario", "estado", "lat", "lng", "key_empresa"],
            // item: item
        });
    }
    $allowEdit() {
        return Model.usuarioPage.Action.getPermiso({ url: Parent.path, permiso: "edit" })
    }
    $allowDelete() {
        return Model.usuarioPage.Action.getPermiso({ url: Parent.path, permiso: "delete" })
    }
    $allowAccess() {
        return Model.usuarioPage.Action.getPermiso({ url: Parent.path, permiso: "ver" })
    }
    $getData() {
        var packs = Model.pack.Action.getAllBy({ key_horario: this.pk })
        var data = Parent.model.Action.getByKey(this.pk);
        if (!data || !packs) return null;
        return data;
    }
    $footer() {
        return <SText>{JSON.stringify(this.data)}</SText>
    }
}
export default connect(index);