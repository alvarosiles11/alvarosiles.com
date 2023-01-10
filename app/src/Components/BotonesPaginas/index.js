import React, { Component } from 'react';
import { SImage, SText, STheme, SView, SIcon, SNavigation } from 'servisofts-component';

type BotonesType = {
    history: 'this.props.history',
    data: [{ url: String, params: object, label: "Title", icon: SIcon, onPress?: Function }]
}
export default class BotonesPaginas extends Component<BotonesType> {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    getButtom = ({ url, label, icon, params, onPress }) => {
        return <SView center
            col={"xs-3 sm-2.5 md-2"}
            style={{
                paddingTop: 16,
                padding: 8,
            }} >
            <SView
                center
                col={"xs-12"}
                colSquare
                onPress={() => {
                    if (onPress) {
                        onPress();
                        return;
                    }
                    SNavigation.navigate(url, params)
                }}>
                <SView
                    col={"xs-10"} colSquare center
                    style={{
                        borderRadius: 8,
                        overflow: 'hidden',
                    }}>
                    {icon}
                </SView>
                <SText style={{
                    color: STheme.color.secondary,
                    textAlign: "center",
                    height: 24,
                    fontSize: 12,
                }}>{label}</SText>
            </SView>
        </SView>
    }
    render() {
        return (
            <SView
                col={"xs-12 md-10 xl-8"}
                center row
                style={{
                    height: "100%",
                }}>
                {this.props.data.map((obj) => {
                    return this.getButtom(obj)
                })}

            </SView>
        );
    }
}
