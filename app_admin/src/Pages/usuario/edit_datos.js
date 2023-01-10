import DPA, { connect } from 'servisofts-page';
import { Parent } from "."
import { SForm, SHr, SInput, SList, SText, SView } from 'servisofts-component';
import Model from '../../Model';
import DatosDocumentosEditar from './Components/DatosDocumentosEditar';

class index extends DPA.profile {
    constructor(props) {
        super(props, {
            Parent: Parent,
            title:"Editar datos y documentos",
            excludes: ["key", "Password"]
        });
    }

    // $allowEdit() {
    //     return Model.usuarioPage.Action.getPermiso({ url: Parent.path, permiso: "edit" })
    // }
    // $allowDelete() {
    //     return Model.usuarioPage.Action.getPermiso({ url: Parent.path, permiso: "delete" })
    // }
    $allowAccess() {
        return Model.usuarioPage.Action.getPermiso({ url: Parent.path, permiso: "ver" })
    }
    $getData() {
        return Parent.model.Action.getByKey(this.pk);
    }
 
    // $item() {
    //     return <SView col={"xs-12"} >
    //         {/* <SText>{this.data.Nombres}</SText> */}
    //     </SView>
    // }

    $footer() {

        return <SView col={"xs-12"}>
            {/* <DatosDocumentos key_usuario={this.pk} /> */}
            {/* <SHr height={16} /> */}
            <DatosDocumentosEditar key_usuario={this.pk} />
            {/* <SHr height={16} /> */}
            {/* <EditarUsuarioRol key_usuario={this.pk} /> */}
        </SView>

    }
}
export default connect(index);