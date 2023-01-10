import DPA, { connect } from 'servisofts-page';
import Model from '../../../../Model';

const Parent = {
    name: "Usuaio del rol",
    path: `/usuario`,
    model: Model.usuario
}
class index extends DPA.list {
    constructor(props) {
        super(props, {
            type:"componentTitle",
            Parent: Parent,
            title:"Usuarios",
            excludes: ["key", "fecha_on", "key_usuario", "Password", "Telefono", "Correo", "CI"]
        });
    }

    // $allowNew() {
    //     return Model.usuarioPage.Action.getPermiso({ url: Parent.path, permiso: "new" });
    // }
    // $allowTable() {
    //     return Model.usuarioPage.Action.getPermiso({ url: Parent.path, permiso: "table" });
    // }
    // $allowAccess() {
    //     return Model.usuarioPage.Action.getPermiso({ url: Parent.path, permiso: "ver" });
    // }
    $filter(data) {
        return data.estado != "0"
    }
    $getData() {
        var usuarios = Model.usuario.Action.getAll();
        var usuarioRol = Model.usuarioRol.Action.getAllByKeyRol(this.props.key_rol);
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