import React from 'react';
import { connect } from 'react-redux';
import { SHr, SGradient, SDate, SInfo, SOrdenador, SComponentContainer, SGrid, SIcon, SNavBar, SNavigation, SPage, SSCrollView, SScrollView2, SScrollView3, SText, STheme, SThread, SUuid, SImage, SList, SBuscador, SView, SLoad, SStorage, SPopup, SPopupOpen, SPopupClose, STable, STable2, SInput, SForm, SButtom, SMapView, SMath, SMarker, Font } from 'servisofts-component';
import MenuChat from '../../Components/MenuChat';

class Ajustes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };

    }

    getBackIcon() {
        return <SView height center>
            <SView width={14} height={14} style={{ transform: [{ rotate: '180deg' }], }} >
                <SIcon name="Back" fill={STheme.color.card} />
            </SView>
        </SView>
    }

    getHeader() {
        return (
            <SView col={"xs-12"} height={50} row border={'red'}>
                <SView flex style={{ justifyContent: "center", }}>
                    <SText fontSize={28} bold>Configuración</SText>
                </SView>
            </SView>
        );
    }



    getList() {
        return (
            <SView flex border={'cyan'}>
                <SScrollView2 disableHorizontal>
                    <SView height={20} />

                    <SView col={"xs-12 md-12 lg-10 xl-6"} height={100} center card >
                        <SView col={"xs-11"} row >
                            <SView col={"xs-2.7 sm-2 md-2 lg-2"} height style={{ justifyContent: "flex-start" }}>
                                <SView style={{
                                    width: 70, height: 70, borderRadius: 50, overflow: 'hidden', backgroundColor: STheme.color.card,
                                }}>
                                    <SIcon name="Girl" fill={STheme.color.info} />
                                </SView>
                            </SView>

                            <SView col={"xs-7.5 sm-9 md-9 lg-9"} >
                                <SView height center style={{ height: '100%', justifyContent: 'center', }} >
                                    <SText fontSize={18} col={"xs-11 md-12"} >Brian Baldiviezo</SText>
                                    <SText fontSize={14} col={"xs-11 md-12"} color={STheme.color.lightBlack} >{"Nos convertimos en lo que pensamos"}</SText>
                                </SView>
                            </SView>

                            <SView col={"xs-1.8 sm-1 md-1 lg-1"} height center style={{ justifyContent: 'flex-end' }}>
                                <SView style={{
                                    width: 40,
                                    height: 40,
                                    padding: 5,
                                    borderRadius: 50, overflow: 'hidden', backgroundColor: STheme.color.card,
                                }}>
                                    <SIcon name="Girl" fill={STheme.color.info} />
                                </SView>
                            </SView>
                        </SView>
                    </SView>





                </SScrollView2 >
            </SView>
        );
    }

    render() {
        return (
            <SPage title={''} hidden disableScroll >
                <SView col={"xs-12"} center height backgroundColor={'transparent'}>
                    <SView col={"xs-11"} flex backgroundColor={'transparent'}>
                        <SHr height={20} />
                        {this.getHeader()}
                        <SHr height={20} />
                        {this.getList()}
                        <SHr height={20} />
                    </SView>
                    <MenuChat url={"ajustes"} />
                </SView>
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(Ajustes);