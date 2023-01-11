import React from 'react';
import { connect } from 'react-redux';
import { SPage, SText, SView } from 'servisofts-component';

class root extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <SPage title={''} hidden disableScroll height >
                <SView col={"xs-12"} center height backgroundColor={'transparent'}>
                    <SView col={"xs-11"} flex height backgroundColor={'transparent'} center>
                        <SText style={{ fontSize: 50 }} >experiencia</SText>




                    </SView>
                    <SView col={"xs-11"} flex height backgroundColor={'red'} center>
                        <SText style={{ fontSize: 50 }} >proyecto</SText>
                    </SView>
                </SView>
            </SPage >
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(root);