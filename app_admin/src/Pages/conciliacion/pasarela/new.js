import DPA, { connect } from 'servisofts-page';
import { Parent } from '.';
import { SDate, SHr, SList, SLoad, SMath, SNavigation, SPopup, SText, STheme, SView } from 'servisofts-component';
import Model from '../../../Model';

class index extends DPA.new {
    constructor(props) {
        super(props, {
            Parent: Parent,
            excludes: ["key", "fecha_on", "key_usuario", "estado", "lat", "lng"]
        });
    }
    componentDidMount() {
        Model.orden_pago.Action.getPendientesConciliacion().then((resp) => {
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
            keys_orden_pago: this.keys_to_conciliate,
            key_usuario: "",
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
            total += parseFloat(obj.comision_pasarela ?? 0)
            this.keys_to_conciliate.push(obj.key);
        })
        return <SView col={"xs-12"}>
            <SHr height={50} />
            <SText fontSize={16}>Ordenes de pago pendientes de conciliacion:</SText>
            <SHr />
            <SView center>
                <SView card center style={{ padding: 16 }}>
                    <SText fontSize={18} bold>Bs. {SMath.formatMoney(total)}</SText>
                </SView>
            </SView>
            <SHr />
            <SView row>
                <SView>
                    <SText>{"CYBERSOURCE:"}</SText>
                    <SText>{"QR:"}</SText>
                </SView>
                <SView width={16} />
                <SView>
                    <SText bold fontSize={16}>{envs["comision_pasarela_tarjeta"]?.value}%</SText>
                    <SText bold fontSize={16}>{envs["comision_pasarela_qr"]?.value}%</SText>
                </SView>
            </SView>
            <SHr />
            <SList
                data={this.state.pendientes}
                order={[{ key: "fecha_on", order: "desc", peso: 1, }]}
                render={(obj) => {
                    const { type, checkout_amount, checkout_currency, fecha_on, comision_pasarela, key_pedido } = obj
                    return <SView col={"xs-12"} card row style={{
                        padding: 4
                    }}>
                        <SText fontSize={10}>{new SDate(fecha_on).toString("yyyy-MM-dd hh:mm:ss")}</SText>
                        <SView flex />
                        <SText fontSize={10}>{!key_pedido ? "COMPRA BILLETERA" : "COMPRA TAPEKE"}</SText>
                        <SHr />
                        <SText bold fontSize={14}>{type}</SText>
                        <SView flex />
                        <SText bold>{checkout_currency} {SMath.formatMoney(checkout_amount)}</SText>
                        <SText bold color={STheme.color.danger}> - {SMath.formatMoney(comision_pasarela ?? 0)}</SText>
                    </SView>
                }}
            />
        </SView >
    }
}

export default connect(index);