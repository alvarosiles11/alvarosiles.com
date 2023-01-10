import { SNavigation } from 'servisofts-component';
import DPA, { connect } from 'servisofts-page';
import { Parent } from "."
import Model from '../../../Model';

class index extends DPA.list {
    constructor(props) {
        super(props, {
            Parent: Parent,
            excludes: ["key", "fecha_on", "key_usuario", "key_servicio", "estado"],
            // item: Item,

        });
    }
    componentDidMount() {
        SNavigation.navigate("/restaurante", {
            onSelect: (obj) => {
                this.setState({ key_restaurante: obj.key })
            }
        })
    }
    $allowNew() {
        return Model.usuarioPage.Action.getPermiso({ url: Parent.path, permiso: "new" });
    }
    onNew() {
        super.onNew({ key_restaurante: this.state.key_restaurante })
    }

    $allowTable() {
        return Model.usuarioPage.Action.getPermiso({ url: Parent.path, permiso: "table" });
    }
    $allowAccess() {
        return Model.usuarioPage.Action.getPermiso({ url: Parent.path, permiso: "ver" });
    }
    $filter(data) {
        return data.estado != 0
    }
    $getData() {
        if (!this.state.key_restaurante) return null;
        // this.empresa = Model.empresa.Action.getSelect();
        // if (!this.empresa) return null;
        return Parent.model.Action.getAllBy({ key_restaurante: this.state.key_restaurante })
    }
}
export default connect(index);