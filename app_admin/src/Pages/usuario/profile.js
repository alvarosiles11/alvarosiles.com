import DPA, { connect } from 'servisofts-page';
import { Parent } from "."
import { SForm, SHr, SInput, SList, SText, SView } from 'servisofts-component';
import Model from '../../Model';
import { EditarUsuarioRol } from 'servisofts-rn-roles_permisos';
import DatosDocumentos from './Components/DatosDocumentos';

class index extends DPA.profile {
    constructor(props) {
        super(props, {
            Parent: Parent, excludes: ["key", "Password"],
            itemType: "1"
        });
    }

    $allowEdit() {
        return Model.usuarioPage.Action.getPermiso({ url: Parent.path, permiso: "edit" })
    }

    $allowAccess() {

        return Model.usuarioPage.Action.getPermiso({ url: Parent.path, permiso: "ver" })
    }
    $allowDelete() {
        if (this.data?.estado == 0) return;
        return Model.usuarioPage.Action.getPermiso({ url: Parent.path, permiso: "delete" })
    }
    $allowRestore() {
        if (this.data?.estado != 0) return false;
        return Model.usuarioPage.Action.getPermiso({ url: Parent.path, permiso: "restore" })
    }
    $getData() {
        return Parent.model.Action.getByKey(this.pk);
    }

    $footer() {

        return <SView col={"xs-12"}>
            <DatosDocumentos key_usuario={this.pk} />
            {/* <SHr height={16} /> */}
            {/* <DatosDocumentosEditar key_usuario={this.pk} /> */}
            <SHr height={16} />
            <EditarUsuarioRol key_usuario={this.pk} url={"/usuario"} permiso={"edit_rol"} />
        </SView>

    }
}
export default connect(index);