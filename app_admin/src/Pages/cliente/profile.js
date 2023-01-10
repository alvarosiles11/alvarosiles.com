import DPA, { connect } from 'servisofts-page';
import { Parent } from "."
import { SForm, SHr, SInput, SList, SText, SView } from 'servisofts-component';
import Model from '../../Model';
import DatosDocumentos from '../usuario/Components/DatosDocumentos';

class index extends DPA.profile {
    constructor(props) {
        super(props, {
            Parent: Parent,
            excludes: ["key", "Password"],
            itemType: "1"
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
        return Parent.model.Action.getByKey(this.pk);
    }

    $footer() {
        return <SView col={"xs-12"}>
            <DatosDocumentos key_usuario={this.pk} />
        </SView>

    }
}
export default connect(index);