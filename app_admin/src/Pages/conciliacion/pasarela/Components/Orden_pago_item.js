import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SDate, SHr, SMath, SPage, SText, STheme, SView } from 'servisofts-component';

class Orden_pago_item extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        const { type, checkout_amount, checkout_currency, fecha_on, comision_pasarela, key_pedido } = this.props.data;
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
    }
}
// const initStates = (state) => {
//     return { state }
// };
// export default connect(initStates)(orden_pago_item);
export default (Orden_pago_item);