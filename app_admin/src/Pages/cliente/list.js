import DPA, { connect } from 'servisofts-page';
import { Parent } from "."
import Model from '../../Model';

class index extends DPA.list {
    constructor(props) {
        super(props, {
            Parent: Parent,
            excludes: ["key", "fecha_on", "key_usuario", "Password", "Telefono", "Correo", "CI"],
            defaultParams: { key_rol: "51ee8a95-094b-41eb-8819-4afa1f349394" },
            params: ["key_rol"]
        });
    }

    $allowNew() {
        return Model.usuarioPage.Action.getPermiso({ url: Parent.path, permiso: "new" });
    }
    $allowTable() {
        return Model.usuarioPage.Action.getPermiso({ url: Parent.path, permiso: "table" });
    }
    $allowAccess() {
        return Model.usuarioPage.Action.getPermiso({ url: Parent.path, permiso: "ver" });
    }
    $filter(data) {
        return data.estado != "0"
    }
    $getData() {
        var usuarios = Model.usuario.Action.getAll();
        var usuarioRol = Model.usuarioRol.Action.getAllByKeyRol(this.$params.key_rol);
        if (!usuarios) return null;
        if (!usuarioRol) return null;
        var obj_final = {};
        Object.values(usuarios).map((obj) => {
            var enabled = Object.values(usuarioRol).find(a => a.key_usuario == obj.key)
            if (enabled) {
                obj["usuarioRol"] = enabled;
                obj_final[obj.key] = obj
            }
        })
        return obj_final;

    }
}
export default connect(index);