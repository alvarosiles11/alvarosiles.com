import React from 'react';
import { connect } from 'react-redux';
import { SHr, SPage, SText, SView } from 'servisofts-component';

class experiencia extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <SPage title={''} hidden disableScroll >
                <SView col={"xs-12"} center height backgroundColor={'red'}>
                    <SView col={"xs-11"} flex backgroundColor={'blue'} center>
                        <SHr height={20} />
                        <SText style={{ fontSize: 50 }} >experiencia</SText>
                    </SView>
                </SView>
            </SPage >
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(experiencia);