import React, { Component } from 'react';
import { SView, SText, STheme, SGradient, SIcon, SNavigation } from 'servisofts-component'
export default class MenuChat extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    getItem({ key, title, icon, url }) {
        var color = STheme.color.secondary + "66";
        if (key == this.props.url) {
            color = STheme.color.info + "ff";
        }
        return <SView flex center height onPress={() => {
            SNavigation.navigate(url);
        }}>
            <SView height={24} colSquare center>
                <SIcon name={icon} fill={color} />
            </SView>
            <SView height={2} />
            <SText fontSize={12} center color={color}>{title}</SText>
        </SView>
    }
    render() {
        return (
            <SView col={"xs-12"} height={60} >
                <SGradient colors={[
                    STheme.color.primary,
                    STheme.color.primary,
                    STheme.color.primary,
                    STheme.color.secondary + "11"
                ]} />

                <SView col={'xs-12'} row height>
                    {this.getItem({ key: "estados", title: 'Estados', icon: 'MenuEstado', url: 'estados' })}
                    {this.getItem({ key: "llamadas", title: 'Llamadas', icon: 'MenuCall', url: "llamadas" })}
                    {this.getItem({ key: "camara", title: 'Camara', icon: 'MenuCamara', url: "camara" })}
                    {this.getItem({ key: "chats", title: 'Chats', icon: 'MenuChats', url: 'chats' })}
                    {this.getItem({ key: "ajustes", title: 'Ajustes', icon: 'MenuAjustes', url: "ajustes" })}
                </SView>
            </SView>
        );
    }
}
