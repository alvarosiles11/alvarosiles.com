import React from 'react';
import { connect } from 'react-redux';
import { SHr, SGradient, SDate, SInfo, SOrdenador, SComponentContainer, SGrid, SIcon, SNavBar, SNavigation, SPage, SSCrollView, SScrollView2, SScrollView3, SText, STheme, SThread, SUuid, SImage, SList, SBuscador, SView, SLoad, SStorage, SPopup, SPopupOpen, SPopupClose, STable, STable2, SInput, SForm, SButtom, SMapView, SMath, SMarker, Font } from 'servisofts-component';

class Test extends React.Component {
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
                        <SText style={{ fontSize: 50 }} >Hola mundo</SText>
                    </SView>
                </SView>
            </SPage >
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(Test);