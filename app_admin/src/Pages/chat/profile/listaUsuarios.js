import { SNavigation } from 'servisofts-component';
import DPA, { connect } from 'servisofts-page';
import Model from '../../../Model';

const Parent = {
    name: "chat_usuario",
    path: "/chat_usuario",
    model: Model.chat_usuario
}
class index extends DPA.list {
    constructor(props) {
        super(props, {
            page: false,
            Parent: Parent,
            type: "componentTitle",
            title: "Participantes",
            excludes: ["key", "fecha_on", "key_usuario", "key_servicio", "estado"],
            // item: Item,

        });
    }
    $allowNew() {
        return true;
        return Model.usuarioPage.Action.getPermiso({ url: Parent.path, permiso: "new" });
    }

    // $allowAccess() {
    //     return Model.usuarioPage.Action.getPermiso({ url: Parent.path, permiso: "ver" });
    // }
    // $filter(data) {
    //     return data.estado != 0
    // }
    onNew() {
        SNavigation.navigate("/usuario", {
            onSelect: (resp) => {
                console.log("asdas");
                Model.chat_usuario.Action.registro({
                    key_chat: this.props.pk,
                    key_usuario: resp.key,
                    app:"client",
                }).then((resp) => {
                    console.log(resp);
                }).catch((e) => {
                    console.error(e);
                })
            }
        })
    }
    // $onSelect(data) {
    //     return;
    // }
    $getData() {
        // var empresa = Model.empresa.Action.getByKey(this.props.key_empresa)
        return Parent.model.Action.getAll({ key_chat: this.props.pk });
    }
}
export default connect(index);