import DPA, { connect } from 'servisofts-page';
import { Parent } from '.';
import { SNavigation, SView } from 'servisofts-component';
import Model from '../../Model';
import DatosDocumentosEditar from '../usuario/Components/DatosDocumentosEditar';

class index extends DPA.edit {
    constructor(props) {
        super(props, {
            Parent: Parent,
            excludes: ["Password"],
        });
    }
    $allowAccess() {
        return Model.usuarioPage.Action.getPermiso({ url: Parent.path, permiso: "edit" })
    }
    $getData() {
        return Parent.model.Action.getByKey(this.pk);
    }
    $inputs() {
        var inputs = super.$inputs();
        inputs["Correo"].type = "email"
        inputs["Telefono"].type = "phone"
        return inputs;
    }


    $onSubmit(data) {
        Parent.model.Action.editar({
            data: {
                ...this.data,
                ...data
            },
            key_usuario: ""
        }).then((resp) => {
            this.presolve(this.pk)
            // SNavigation.goBack();
        }).catch(e => {
            console.error(e);

        })
    }
    $submitName() {
        return ""
    }
    $footer() {
        return <DatosDocumentosEditar key_usuario={this.pk} key_rol={"51ee8a95-094b-41eb-8819-4afa1f349394"} onSubmit={() => {
            return new Promise((resolve, reject) => {
                this.presolve = resolve;
                this.form.submit();
                // resolve("KEY_USUARIO");
            })
        }} />
    }
}

export default connect(index);