import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SHr, SPage, SText, SList } from 'servisofts-component';
import Btn from '../Components/Btn';

class Test extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <SPage title={'Test'} hidden>
                <SList
                    data={new Array(100).fill(1)}
                // render={(a) => {
                //     return <SText>{a}</SText>
                // }}
                />
            </SPage >
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(Test);