import DPA, { connect } from 'servisofts-page';
import { Parent } from '.';
import { SNavigation } from 'servisofts-component';
import Model from '../../../Model';

class index extends DPA.edit {
    constructor(props) {
        super(props, {
            Parent: Parent,
            excludes: []
        });
    }



    getOptionsTipo() {
        return [
            { key: "", content: "--" },
            { key: "text", content: "Texto" },
            { key: "number", content: "Numero" },
            { key: "money", content: "Moneda" },
            { key: "date", content: "Fecha" },
        ]
    }
    $inputs() {
        var inp = super.$inputs();
        inp["required"].type = "checkBox"
        inp["required"].col = "xs-5"
        inp["caducable"].type = "checkBox"
        inp["caducable"].col = "xs-5"
        inp["tipo"] = { label: "Tipo de dato", required: true, type: "select", defaultValue: this.data["tipo"], options: Model.dato.Action.getTiposDato() }
        return inp;
    }
    $allowAccess() {
        return Model.usuarioPage.Action.getPermiso({ url: Parent.path, permiso: "edit" })
    }
    $getData() {
        return Parent.model.Action.getByKey(this.pk);
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