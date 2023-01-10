import React, { Component } from 'react';
import { View, Text, Animated, Dimensions, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { SIcon, SImage, SNavigation, SText, STheme, SView, SButtom } from 'servisofts-component';
import SSocket from 'servisofts-socket';
import Search from '../../Components/Search';
import NavBar from '../../Components/NavBar';
class BarraSuperior extends Component {
    constructor(props) {
        super(props);
        this.state = {
            anim: new Animated.Value(0),
        };

    }

    startAnimation() {
        Animated.timing(this.state.anim, {
            toValue: 100,
            duration: !this.props.duration ? 300 : this.props.duration,
        }).start();
    }
    componentDidMount() {

        this.startAnimation();
    }

    getUser() {
        if (!this.props.state.usuarioReducer.usuarioLog) {
            return <View />
        }
        return (<>
            <View style={{
                width: 50,
                height: "100%",
                justifyContent: "center",
                // borderRadius:,
                borderBottomEndRadius: 30,
                borderTopLeftRadius: 8,
                overflow: "hidden",
            }}>
                <TouchableOpacity style={{
                    width: "100%",
                    height: "100%",
                }} onPress={() => {
                    SNavigation.navigate("perfil")
                    // this.props.navigation.navigate("UsuarioPerfilPage")
                }}>
                    <SImage src={SSocket.api.root + "usuario_" + this.props.state.usuarioReducer.usuarioLog.key} style={{
                        width: "100%",
                        height: "100%",
                    }} />


                </TouchableOpacity>
            </View>
            <View style={{
                position: "absolute",
                bottom: 2,
                right: 2,
                width: 14,
                height: 14,
                borderRadius: 100,
                backgroundColor: "#090"
            }}>
            </View>
        </>
        )
    }
    getTitle() {
        var text = ""
        if (this.props.title) {
            text = this.props.title;
        }
        return (<Text style={{
            color: "#fff",
            fontWeight: "bold",
        }}>{text}</Text>)
    }
    render() {
        return (
            <Animated.View style={{
                width: "100%",
                height: 45,
                flexDirection: "row",
                transform: [
                    {
                        translateY: this.state.anim.interpolate({
                            inputRange: [0, 100],
                            outputRange: [-45, 0]
                        })
                    }
                ]
            }}>
                <View style={{
                    width: 135,
                    height: "100%",
                    position: "absolute",
                    right: 0,
                    backgroundColor: "#121212",
                }}>
                </View>
                <View style={{
                    flex: 1,
                    flexDirection: "row",
                    backgroundColor: "#121212",
                    borderBottomEndRadius: 30,
                    borderColor: "#707070",
                    zIndex: 9999
                }}>

                    {/* MENU */}
                    {/* <SButtom onPress={() => {
                        NavBar.open();
                    }} style={{
                        position: "absolute",
                        zIndex: 999999999,
                        top: -8,
                        left: -5
                    }}>
                        <SIcon name={"Menu2"} fill="#fff" width={20} style={{ top: "10px", position: "relative" }} />
                        <SText fontSize={18} font={"Roboto-Light"}>Menú</SText>
                    </SButtom> */}
                    {/* MENU */}

                    <TouchableOpacity style={{
                        width: 40,
                        height: "100%",
                        backgroundColor: "#121212",
                        justifyContent: "center",
                        alignItems: "center",
                    }} activeOpacity={0.9} onPress={() => {
                        SNavigation.goBack()
                    }}>
                        {this.props.preventBack ? (<SButtom onPress={() => {
                        NavBar.open();
                    }} style={{
                        position: "absolute",
                        zIndex: 999999999,
                        top: -8,
                        left: -5,
                        width:100
                    }}>
                        <SIcon name={"Menu2"} fill="#fff" width={20} style={{ top: "10px", position: "relative" }} />
                        <SText fontSize={18} font={"Roboto-Light"}>Menú</SText>
                    </SButtom>) : (<SView><SIcon name={"Back"} fill={"#fff"} width={8} /></SView>)}
                    </TouchableOpacity>


                    <View style={{
                        flex: 1,
                        justifyContent: "center",
                        // alignItems: "center"
                    }}>
                        {this.getTitle()}

                    </View>
                    <SView style={{ marginTop: 10 }} >
                        <TouchableOpacity
                            onPress={() => {
                                Search.open();
                            }} >
                            <SIcon name={"Search"} width={25} fill="#c1c1c1" />
                        </TouchableOpacity>
                    </SView>
                </View>

                <View style={{
                    width: 100,
                    height: "100%",
                    padding: 10,
                    // backgroundColor: "#fff"
                }}>
                    <SIcon name={"Arrow"} width={10} height={10} />

                </View>
                {/* <RelojEntrenamiento navigation={this.props.navigation} /> */}
                {/* <RelojCaja navigation={this.props.navigation} /> */}
            </Animated.View >
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(BarraSuperior);