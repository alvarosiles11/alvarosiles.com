import DPA, { connect } from 'servisofts-page';
import { Parent } from '.';
import { SDate, SHr, SList, SLoad, SMath, SNavigation, SPopup, SText, STheme, SView } from 'servisofts-component';
import Model from '../../../Model';
import Pedido_item from './Components/Pedido_item';

class index extends DPA.new {
    constructor(props) {
        super(props, {
            Parent: Parent,
            excludes: ["key", "fecha_on", "key_usuario", "estado", "lat", "lng"]
        });
    }
    componentDidMount() {
        Model.pedido.Action.getPendientesConciliacion({ key_restaurante: this._params.key_restaurante }).then((resp) => {
            this.setState({ pendientes: resp.data })
        }).catch(e => {
            console.error(e)
        })
    }
    $allowAccess() {
        return Model.usuarioPage.Action.getPermiso({ url: Parent.path, permiso: "new" })
    }
    $onSubmit(data) {
        Parent.model.Action.registro({
            data: data,
            keys_pedido: this.keys_to_conciliate,
            key_usuario: Model.usuario.Action.getKey(),
        }).then((resp) => {
            SNavigation.goBack();
        }).catch(e => {
            console.error(e);

        })
    }
    $footer() {
        var envs = Model.enviroment.Action.getAll();
        if (!envs || !this.state.pendientes) return <SLoad />
        var total = 0;
        this.keys_to_conciliate = [];
        Object.values(this.state.pendientes).map(obj => {
            total += parseFloat(obj.comision_restaurante ?? 0)
            this.keys_to_conciliate.push(obj.key);
        })
        return <SView col={"xs-12"}>
            <SHr height={50} />
            <SText fontSize={16}>Pedidos pendientes de conciliacion:</SText>
            <SHr />
            <SView center>
                <SView card center style={{ padding: 16 }}>
                    <SText fontSize={18} bold>Bs. {SMath.formatMoney(total)}</SText>
                </SView>
            </SView>
            <SHr />
            <SList
                data={this.state.pendientes}
                order={[{ key: "fecha_on", order: "desc", peso: 1, }]}
                render={(obj) => <Pedido_item data={obj} />}
            />
        </SView >
    }
}

export default connect(index);