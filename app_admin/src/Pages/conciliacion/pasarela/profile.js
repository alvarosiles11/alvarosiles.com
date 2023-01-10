import DPA, { connect } from 'servisofts-page';
import { Parent } from "."
import { SHr, SList, SLoad, SText, SView } from 'servisofts-component';
import Model from '../../../Model';
import Orden_pago_item from './Components/Orden_pago_item';

class index extends DPA.profile {
    constructor(props) {
        super(props, {
            Parent: Parent,
            excludes: ["key", "key_usuario", "estado", "lat", "lng", "key_empresa"],
            // item: item
        });
    }
    componentDidMount() {
        Model.orden_pago.Action.getConciliadas({ key_conciliacion_pasarela: this.pk }).then((resp) => {
            this.setState({ ordenes: resp.data })
        }).catch(e => {
            console.error(e)
        })
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
        return <SView col={"xs-12"}>
            <SHr />
            <SText>{"Ordenes de pago que se pagaron en esta conciliacion:"}</SText>
            <SHr />
            <SList
                data={this.state.ordenes}
                render={(obj) => <Orden_pago_item data={obj} />} />
            {/* <SText>{JSON.stringify(this.state.ordenes)}</SText> */}

        </SView>
    }
}
export default connect(index);