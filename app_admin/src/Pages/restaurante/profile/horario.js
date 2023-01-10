import DPA, { connect } from 'servisofts-page';
import { Parent } from ".."
import { SDate, SHr, SList, SLoad, SNavigation, SText, SView } from 'servisofts-component';
import Model from '../../../Model';
import HorarioLista from './Components/horarioLista';

class index extends DPA.profile {
    constructor(props) {
        super(props, {
            Parent: Parent,
            excludes: ["key", "key_usuario", "estado", "latitude", "longitude"],
            // item: item
        });
    }
    $allowBack() {
        return true;
    }
    $allowEdit() {
        return Model.usuarioPage.Action.getPermiso({ url: Parent.path, permiso: "edit" })
    }
    $allowDelete() {
        return Model.usuarioPage.Action.getPermiso({ url: Parent.path, permiso: "delete" })
    }
    $allowAccess() {
        return Model.usuarioPage.Action.getPermiso({ url: Parent.path, permiso: "ver" })
    }
    $getData() {
        return Parent.model.Action.getByKey(this.pk);
    }
    $footer() {

        return <SView col={"xs-12"} >
            <HorarioLista key_restaurante={this.pk} />
        </SView>
    }
}
export default connect(index);