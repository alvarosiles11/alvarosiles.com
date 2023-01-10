import DPA, { connect } from 'servisofts-page';
import { Parent } from '.';
import { SNavigation, SPopup, SThread } from 'servisofts-component';
import Model from '../../Model';
import DatosDocumentosEditar from '../usuario/Components/DatosDocumentosEditar';

class index extends DPA.new {
    constructor(props) {
        super(props, {
            Parent: Parent,
            excludes: ["key", "fecha_on", "key_usuario", "estado", "Password"],
            params: ["key_rol"],

        });
    }
    $allowAccess() {
        return Model.usuarioPage.Action.getPermiso({ url: Parent.path, permiso: "new" })
    }
    $inputs() {
        var inputs = super.$inputs();
        // inputs["Password"].type = "password"
        inputs["Correo"].type = "email"
        inputs["Telefono"].type = "phone"
        // inputs["rep_pass"] = { label: "Rep. Password", type: "password", required: true }
        return inputs;
    }
    $submitName() {
        return "";
    }
    $onSubmit(data) {
        // if (data["Password"] != data["rep_pass"]) {
        //     SPopup.alert("Las contraceñas no coinciden.")
        //     return;
        // }
        Parent.model.Action.registro({
            data: data,
            key_usuario: ""
        }).then((resp) => {
            this.$submitFile(resp.data.key);
            new SThread(500, "esperarFoto", false).start(() => {
                Model.usuarioRol.Action.registro({
                    data: {
                        key_rol: this.$params.key_rol,
                        key_usuario: resp.data.key,
                    },
                    key_usuario: Model.usuario.Action.getKey()
                }).then((tesp) => {
                    if (this.presolve) {
                        this.presolve(resp.data.key);
                    }
                })
            })

        }).catch(e => {
            if (e.error_dato) {
                SPopup.alert("El dato (" + e.error_dato + ") ya existe para otro usuario.")
                return;
            }
            SPopup.alert("error")
        })
    }
    $footer() {
        return <DatosDocumentosEditar key_rol={"51ee8a95-094b-41eb-8819-4afa1f349394"} onSubmit={() => {
            return new Promise((resolve, reject) => {
                this.presolve = resolve;
                this.form.submit();
                // resolve("KEY_USUARIO");
            })
        }} />
    }
}

export default connect(index);