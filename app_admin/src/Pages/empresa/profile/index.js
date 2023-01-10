import DPA, { connect } from 'servisofts-page';
import { Parent } from ".."
import { SHr, SList, SLoad, SText, SView } from 'servisofts-component';
import Model from '../../../Model';
import ListaSucursal from './listaSucursal';
class index extends DPA.profile {
    constructor(props) {
        super(props, { Parent: Parent, excludes: ["key", "key_usuario", "key_servicio", "estado"] });
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
    $footer() {
        return <SView col={"xs-12"}>
            <ListaSucursal key_empresa={this.pk}/>
        </SView>
    }
    $getData() {
        return Parent.model.Action.getByKey(this.pk);
    }
}
export default connect(index);