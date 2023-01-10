import DPA, { connect } from 'servisofts-page';
import { Parent } from "."
import { SNavigation } from 'servisofts-component';
import Model from '../../../Model';

class index extends DPA.delete {
    constructor(props) {
        super(props, { Parent: Parent, });
    }
    $allowAccess() {
        return Model.usuarioPage.Action.getPermiso({ url: Parent.path, permiso: "delete" })
    }
    $onDelete() {
        this.data.estado = 0;
        Parent.model.Action.editar({
            data: this.data,
            key_usuario: ""
        }).then((resp) => {
            SNavigation.goBack();
        }).catch(e => {
            console.error(e);
        })
    }

    $getData() {
        return Parent.model.Action.getByKey(this.pk);
    }
}
export default connect(index);