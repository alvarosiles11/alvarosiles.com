import DPA, { connect } from 'servisofts-page';
import { Parent } from "."
import Model from '../../Model';

class index extends DPA.list {
    constructor(props) {
        super(props, {
            Parent: Parent,
            excludes: ["key", "fecha_on", "key_usuario", "key_servicio", "estado", "lat", "lng", "observacion", "key_empresa"],
            // item: Item,

        });
    }
    $allowNew() {
        return Model.usuarioPage.Action.getPermiso({ url: Parent.path, permiso: "new" });
    }
    onNew() {
        super.onNew({ key_empresa: this.empresa?.key })
    }

    $allowTable() {
        return Model.usuarioPage.Action.getPermiso({ url: Parent.path, permiso: "table" });
    }
    $allowAccess() {
        return Model.usuarioPage.Action.getPermiso({ url: Parent.path, permiso: "ver" });
    }
    $filter(data) {
        return data.estado != 0
    }
    $getData() {
        this.empresa = Model.empresa.Action.getSelect();
        if (!this.empresa) return null;
        return Parent.model.Action.getAll(this.empresa.key);
    }
}
export default connect(index);