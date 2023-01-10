import DPA, { connect } from 'servisofts-page';
import { Parent } from "."
import Model from '../../Model';

class index extends DPA.table {
    constructor(props) {
        super(props, {
            Parent: Parent,
            excludes: ["key", "key_servicio", "estado"]
        });
    }
    $allowAccess() {
        return Model.usuarioPage.Action.getPermiso({ url: Parent.path, permiso: "table" });
    }

    $headers() {
        var heads = super.$headers();
        heads["descripcion"].width = 200;
        heads["fecha_on"].width = 150;
        return heads;
    }
    $filter(data) {
        return data.estado != 0 && !data.is_admin
    }
    $getData() {
        return Parent.model.Action.getAll();
    }
}
export default connect(index);