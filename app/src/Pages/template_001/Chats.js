import React from 'react';
import { connect } from 'react-redux';
import { SHr, SGradient, SDate, SInfo, SOrdenador, SComponentContainer, SGrid, SIcon, SNavBar, SNavigation, SPage, SSCrollView, SScrollView2, SScrollView3, SText, STheme, SThread, SUuid, SImage, SList, SBuscador, SView, SLoad, SStorage, SPopup, SPopupOpen, SPopupClose, STable, STable2, SInput, SForm, SButtom, SMapView, SMath, SMarker, Font } from 'servisofts-component';
import MenuChat from '../../Components/MenuChat';

class Chats extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    getHeader() {
        return (
            <SView col={"xs-12"} height={50} row border={'red'}>
                <SView flex style={{ justifyContent: "center", }}>
                    <SText fontSize={28} bold>Chats</SText>
                </SView>
            </SView>
        );
    }

    getList() {
        return (
            <SView flex border={'yellow'} >
                <SScrollView2 disableHorizontal >
                    <SHr height={20} />
                    <SView col={"xs-12"} center  >
                        <SView col={"xs-6"} card style={{ padding: 16 }}>
                            <SText>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae placeat corporis dolore magni ipsa voluptatem ad tempora obcaecati eaque, adipisci ea! Recusandae, non maxime. Odit molestias sunt fuga totam optio.</SText>
                        </SView>
                        <SHr height={20} />
                        <SView col={"xs-6"} card style={{ padding: 16 }}>
                            <SText>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae placeat corporis dolore magni ipsa voluptatem ad tempora obcaecati eaque, adipisci ea! Recusandae, non maxime. Odit molestias sunt fuga totam optio.</SText>
                        </SView>
                        <SHr height={20} />
                        <SView col={"xs-6"} card style={{ padding: 16 }}>
                            <SText>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae placeat corporis dolore magni ipsa voluptatem ad tempora obcaecati eaque, adipisci ea! Recusandae, non maxime. Odit molestias sunt fuga totam optio.</SText>
                        </SView>
                        <SHr height={20} />
                        <SView col={"xs-6"} card style={{ padding: 16 }}>
                            <SText>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae placeat corporis dolore magni ipsa voluptatem ad tempora obcaecati eaque, adipisci ea! Recusandae, non maxime. Odit molestias sunt fuga totam optio.</SText>
                        </SView>
                        <SHr height={20} />
                        <SView col={"xs-6"} card style={{ padding: 16 }}>
                            <SText>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae placeat corporis dolore magni ipsa voluptatem ad tempora obcaecati eaque, adipisci ea! Recusandae, non maxime. Odit molestias sunt fuga totam optio.</SText>
                        </SView>
                        <SHr height={20} />

                        <SView col={"xs-6"} card style={{ padding: 16 }}>
                            <SText>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae placeat corporis dolore magni ipsa voluptatem ad tempora obcaecati eaque, adipisci ea! Recusandae, non maxime. Odit molestias sunt fuga totam optio.</SText>
                        </SView>
                        <SHr height={20} />
                        <SView col={"xs-6"} card style={{ padding: 16 }}>
                            <SText>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae placeat corporis dolore magni ipsa voluptatem ad tempora obcaecati eaque, adipisci ea! Recusandae, non maxime. Odit molestias sunt fuga totam optio.</SText>
                        </SView>
                        <SHr height={20} />
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
                    <MenuChat url={"chats"} />
                </SView>
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(Chats);