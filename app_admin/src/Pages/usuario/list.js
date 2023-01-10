import { SNavigation } from 'servisofts-component';
import DPA, { connect } from 'servisofts-page';
import { Parent } from "."
import Model from '../../Model';

class index extends DPA.list {
    constructor(props) {
        super(props, {
            Parent: Parent,
            excludes: ["key", "fecha_on", "key_usuario", "Password", "Telefono", "Correo", "CI"],
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
    $menu() {
        var menu = super.$menu();
        if (Model.usuarioPage.Action.getPermiso({ url: Parent.path, permiso: "show_deleted" })) {
            menu.push({
                label: "Eliminados", onPress: () => {
                    console.log(Parent.path)
                    SNavigation.navigate(Parent.path + "/eliminados")
                }
            })
        }

        return menu;
    }
    $order() {
        return [{ key: "Nombres", order: "asc", peso: 2 }, { key: "Apellidos", order: "asc", peso: 1 }]
    }
    $filter(data) {
        // return true;
        return data.estado != "0"
    }
    $getData() {
        return Parent.model.Action.getAll();
    }
}
export default connect(index);