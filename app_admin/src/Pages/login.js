import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SForm, SHr, SIcon, SInput, SNavigation, SPage, SPopup, SText, STheme, SView } from 'servisofts-component';
import Model from '../Model';
import CryptoJS from 'crypto-js';
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        if (Model.usuario.Action.getUsuarioLog()) {
            SNavigation.replace("/");
            return null;
        }

        return (
            <SPage title={'Login'} hidden >
                <SView col={"xs-12"} center>
                    <SHr height={50} />
                    <SView width={300} height={100} center>
                        <SIcon name={"Logo"} fill={STheme.color.secondary} />
                    </SView>
                    <SHr height={50} />
                    <SText fontSize={18}>Iniciar sesión</SText>
                    <SHr height={16} />
                    <SForm
                        col={"xs-11 sm-10 md-8 lg-6 xl-4"}
                        ref={ref => this.form = ref}
                        inputs={{
                            usuario: {
                                label: "Correo",
                                type: 'email',
                                required: true,
                                autoFocus: true,
                                keyboardType: 'email-address',
                                onKeyPress: (evt) => {
                                    if (evt.key === 'Enter') {
                                        this.form.focus('password');
                                    }
                                },
                            },
                            password: {
                                label: "Contraseña",
                                type: "password",
                                required: true,
                                onKeyPress: (evt) => {
                                    if (evt.key === 'Enter') {
                                        this.form.submit();
                                    }
                                },
                            }
                        }}

                        onSubmitName={"Ingresar"}
                        onSubmitProps={{
                            type: "outline"
                        }}
                        onSubmit={(data) => {
                            console.log(data);
                            data["password"] = CryptoJS.MD5(data["password"]).toString();
                            Model.usuario.Action.login(data).then((resp) => {
                                console.log("exito");
                            }).catch(e => {
                                SPopup.alert("usuario no encontrado")
                            })
                        }}
                    />
                </SView>
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(Login);