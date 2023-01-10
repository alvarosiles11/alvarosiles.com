import DPA, { connect } from 'servisofts-page';
import { Parent } from ".."
import { SDate, SHr, SList, SLoad, SText, SView } from 'servisofts-component';
import Model from '../../../Model';

class index extends DPA.profile {
    constructor(props) {
        super(props, {
            Parent: Parent,
            excludes: ["key", "key_usuario", "estado"],
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
            <SHr />
            <SText fontSize={16} bold>Partners</SText>
            <SHr />

            {this.renderHorarios()}
        </SView>
    }
    renderHorarios() {
        var usuarios = Model.usuario.Action.getAll();
        var usr = Model.usuario_restaurante.Action.getAllBy({
            key_restaurante: this.pk
        });
        if (!usuarios) return <SLoad />
        if (!usr) return <SLoad />
        return <SList
            data={usr}
            render={(data) => {
                var usuario = usuarios[data.key_usuario];
                return <SView card col={"xs-12"} style={{ padding: 8 }}>
                    <SText>{usuario.Nombres}</SText>
                    <SText>{usuario.Apellidos}</SText>
                </SView>
            }}
        />
    }
}
export default connect(index);