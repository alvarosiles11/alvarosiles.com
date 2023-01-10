import DPA, { connect } from 'servisofts-page';
import { Parent } from '.';
import { SNavigation } from 'servisofts-component';
import Model from '../../../Model';

class index extends DPA.new {
    constructor(props) {
        super(props, {
            Parent: Parent,
            excludes: ["key", "fecha_on", "key_usuario", "key_servicio", "estado"]
        });
    }


    $inputs() {
        var inp = super.$inputs();

        inp["required"] = { ...inp["required"], type: "checkBox", col: "xs-5", }
        inp["caducable"] = { ...inp["caducable"], type: "checkBox", col: "xs-5" }

        inp["tipo"] = { label: "Tipo de dato", required: true, type: "select", defaultValue: "", options: Model.dato.Action.getTiposDato() }
        return inp;
    }
    $allowAccess() {
        return Model.usuarioPage.Action.getPermiso({ url: Parent.path, permiso: "new" })
    }
    $onSubmit(data) {
        Parent.model.Action.registro({
            data: data,
            key_usuario: Model.usuario.Action.getKey()
        }).then((resp) => {
            this.$submitFile(resp.data.key);
            SNavigation.goBack();
        }).catch(e => {
            console.error(e);

        })
    }
}

export default connect(index);