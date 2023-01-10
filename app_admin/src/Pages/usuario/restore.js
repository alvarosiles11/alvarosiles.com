import DPA, { connect } from 'servisofts-page';
import { Parent } from "."
import { SNavigation, SPopup } from 'servisofts-component';
import Model from '../../Model';

class index extends DPA.restore {
    constructor(props) {
        super(props, { Parent: Parent, });
    }
    $allowAccess() {
        return Model.usuarioPage.Action.getPermiso({ url: Parent.path, permiso: "restore" })
    }
    $onRestore() {
        this.data.estado = 1;
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