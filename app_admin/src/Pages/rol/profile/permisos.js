import DPA, { connect } from 'servisofts-page';
import { Parent } from ".."
import { SView } from 'servisofts-component';
import { EditarPermisosRol } from 'servisofts-rn-roles_permisos'
// import EditarPermisosRol from './Components/EditarPermisosRol';
import Model from '../../../Model';

class index extends DPA.profile {
    constructor(props) {
        super(props, { Parent: Parent, excludes: ["key", "key_servicio", "estado"] });
    }

    $allowBack() {
        return true;
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
        return Parent.model.Action.getByKey(this.pk);
    }
    $footer() {
        return <SView col={"xs-12"}>
            <EditarPermisosRol key_rol={this.pk} url_permiso={"/rol/profile/permisos"} />
        </SView>
    }

}
export default connect(index);