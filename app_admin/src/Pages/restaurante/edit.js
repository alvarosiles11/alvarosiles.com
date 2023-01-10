import DPA, { connect } from 'servisofts-page';
import { Parent } from '.';
import { SNavigation, SPopup } from 'servisofts-component';
import Model from '../../Model';
import SSocket from 'servisofts-socket'
class index extends DPA.edit {
    constructor(props) {
        super(props, {
            Parent: Parent,
            excludes: []
        });
    }
    $allowAccess() {
        return Model.usuarioPage.Action.getPermiso({ url: Parent.path, permiso: "edit" })
    }
    $getData() {
        return Parent.model.Action.getByKey(this.pk);
    }
    $inputs() {
        var inp = super.$inputs();
        inp["foto_portada"] = {
            label: "Portada",
            key: "foto_portada",
            type: "image",
            defaultValue: SSocket.api.root + "restaurante/portada/" + this.pk,
            col: "xs-12",
            style: {
                height: 400,
            }
        }
        return inp;
    }
    $onSubmitFile() {
        super.$onSubmitFile();
        this.form.uploadFiles(
            SSocket.api.root + "upload/restaurante/portada/" + this.pk,
            "foto_portada"
        );
        // this.form.uploadFiles2(
        //     SSocket.api.root + "upload/restaurante/portada/" + this.pk,
        // );
    }
    $onSubmit(data) {

        Parent.model.Action.editar({
            data: {
                ...this.data,
                ...data
            },
            key_usuario: ""
        }).then((resp) => {
            SNavigation.goBack();
        }).catch(e => {
            console.error(e);

        })
    }
}

export default connect(index);