import React, { Component } from 'react';
import { Animated } from 'react-native';
import { SButtom, SView, SImage, SDate, SNavigation, SIcon, SText } from 'servisofts-component';
import { connect } from 'react-redux';
import SSocket from 'servisofts-socket';
import CerrarSession from '../../Pages/Usuario/Page/Perfil/CerrarSession';


class NavBar extends Component {
    static INSTACE = null;
    static open() {
        NavBar.INSTACE.fadeIn();
    }
    static close() {
        NavBar.INSTACE.fadeOut();
    }

    constructor(props) {
        super(props);
        this.state = {
            timeAnim: 350,
            isOpen: false,
        };
        NavBar.INSTACE = this;
        this.animSize = new Animated.Value(0);
    }

    fadeIn() {
        this.setState({ isOpen: true });
        Animated.timing(this.animSize, {
            toValue: 1,
            duration: this.state.timeAnim,
            // useNativeDriver: true
        }).start();
    }

    fadeOut() {

        Animated.timing(this.animSize, {
            toValue: 0,
            duration: this.state.timeAnim,
            // useNativeDriver: true
        }).start(() => {
            this.setState({ isOpen: false });
        });
    }

    getPerfil() {
        var usuario = this.props.state.usuarioReducer.usuarioLog
        return (
            <SView style={{
                width: "100%",
                height: 130,
                borderBottomWidth: 1,
                borderColor: "#484848",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row"
            }}>
                <SView style={{
                    width: 100,
                    height: 100,
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <SView style={{
                        width: "90%",
                        height: "90%",
                        backgroundColor: "#66000022",
                        borderRadius: 8,
                        overflow: "hidden",
                    }} onPress={() => {
                        SImageImput.choseFile({
                            servicio: "root",
                            component: "usuario",
                            type: "subirFoto",
                            estado: "cargando",
                            key: usuario.key,
                            key_usuario: usuario.key,
                        }, (resp) => {
                            this.props.dispatch({
                                component: "image",
                                type: "cambio",
                                url: SSocket.api.root + "usuario_" + this.props.state.usuarioReducer.usuarioLog.key,
                            })
                        });
                    }}>
                        <SImage src={`${SSocket.api.root}${"usuario_" + this.props.state.usuarioReducer.usuarioLog.key}`} style={{
                            width: "100%",
                            height: "100%",
                        }} />


                    </SView>
                </SView>
                <SView style={{
                    flex: 1,
                    height: "100%",
                    justifyContent: "center",
                    alignItems: "center"
                    // backgroundColor:"#000"
                }}>
                    <SView style={{
                        width: "95%",
                        flex: 1,
                        alignItems: "center",
                        flexDirection: "row"
                    }}>
                        <SText style={{
                            flex: 5,
                            fontSize: 20,
                            fontWeight: "bold",
                            color: "#fff"
                        }}>{usuario["Nombres"] + " " + usuario["Apellidos"]} </SText>
                    </SView>
                    <SView style={{
                        width: "95%",
                        flex: 1,
                    }}>
                        <SText style={{
                            width: "90%",
                            fontSize: 14,
                            color: "#bbb"
                        }}>{usuario["Correo"]} </SText>
                        <SText style={{
                            width: "90%",
                            fontSize: 14,
                            color: "#bbb"
                        }}>{usuario["Telefono"]} </SText>
                    </SView>
                </SView>
            </SView>
        )
    }

    getNav() {
        return <SView col={"xs-10 md-6 xl-4"} height backgroundColor={"#2f2f2f"}
            style={{
                position: "absolute",
                left: this.animSize.interpolate({
                    inputRange: [0, 1],
                    outputRange: ["-70%", "0%"],
                }),
            }}

        >
            <SView backgroundColor={"#292929"} width="100%" height={20}></SView>
            {this.getPerfil()}

            <SView col={"xs-12"} style={{ color: "#ababab", padding: 10, }}>
                <SView row onPress={() => {
                    SNavigation.navigate("inicio");
                    this.fadeOut();
                }}  >
                    <SView style={{ padding: 10, }} row >
                        <SIcon fill="#ababab" name={"Menu"} width={24} />
                        <SText center style={{ paddingLeft: 10 }}>Inicio</SText>
                    </SView>
                </SView>
                <SView col={"xs-12"} />
                <SView onPress={() => {
                }}>
                    <SView style={{ padding: 10, }} row>
                        <SIcon fill="#ababab" name={"Check"} width={24} />
                        <SText center style={{ paddingLeft: 10 }}>Carreras</SText>
                    </SView>
                </SView>
                <SView col={"xs-12"} />
                <SView onPress={() => {
                }}>
                    <SView style={{ padding: 10, }} row>
                        <SIcon fill="#ababab" name={"Favorito"} width={24} />
                        <SText center style={{ paddingLeft: 10 }}>Mis club's</SText>
                    </SView>
                </SView>
                <SView col={"xs-12"} />
                <SView onPress={() => {
                }}>
                    <SView style={{ padding: 10, }} row>
                        <SIcon fill="#ababab" name={"Favorito2"} width={24} />
                        <SText center style={{ paddingLeft: 10 }}>Mis señoritas</SText>
                    </SView>
                </SView>
                <SView col={"xs-12"} />
                <SView onPress={() => {
                }}>
                    <SView style={{ padding: 10, }} row>
                        <SIcon fill="#ababab" name={"Reserve"} width={24} />
                        <SText center style={{ paddingLeft: 10 }}>Reservas</SText>
                    </SView>
                </SView>
                <SView col={"xs-12"} />
                <SView onPress={() => {
                }}>
                    <SView style={{ padding: 10, }} row>
                        <SIcon fill="#ababab" name={"Eyes"} width={24} />
                        <SText center style={{ paddingLeft: 10 }}>Ocultar aplicación</SText>
                    </SView>
                </SView>
                <SView col={"xs-12"} />
                <CerrarSession />
            </SView>

        </SView>
    }
    render() {
        NavBar.INSTACE = this;
        if (!this.state.isOpen) return null;
        return (
            <SView style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                //backgroundColor: "#66000066",
                backgroundColor: "#00000099",
            }}
                activeOpacity={1}
                onPress={() => {
                    if (this.state.isOpen) {
                        this.fadeOut();
                    } else {
                        this.fadeIn();
                    }
                }
                }>
                {this.getNav()}
            </SView>
        );
    }
}

const initStates = (state) => {
    return { state }
};
export default connect(initStates)(NavBar);