import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SDate, SHr, SMath, SPage, SText, STheme, SView } from 'servisofts-component';

class Pedido_item extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        const { state, precio, fecha_on, comision_restaurante, key_pedido, horario } = this.props.data;
        return <SView col={"xs-12"} card row style={{
            padding: 4
        }}>
            <SText fontSize={10}>{new SDate(fecha_on).toString("yyyy-MM-dd hh:mm:ss")}</SText>
            <SView flex />
            <SText fontSize={10}>{horario?.porcentaje_comision}%</SText>
            <SHr />
            <SText bold fontSize={14}>{state}</SText>
            <SView flex />
            <SText bold>{"Bs."} {SMath.formatMoney(precio)}</SText>
            <SText bold color={STheme.color.danger}> - {SMath.formatMoney(comision_restaurante ?? 0)}</SText>
        </SView>
    }
}
// const initStates = (state) => {
//     return { state }
// };
// export default connect(initStates)(Pedido_item);
export default (Pedido_item);