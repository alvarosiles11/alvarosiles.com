import React, { Component } from 'react';
import { View } from 'react-native';
import { SImage, STheme } from 'servisofts-component';
type type = {
    source: Object,
    contraste: String

}
export default class BackgroundImage extends Component<type> {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    getBackground = () => {
        var source = this.props.source;
        if (!source) {
            if (STheme.getTheme() == 'dark') {
                source = require("./dark.jpg");
            } else {
                source = require("./default.jpg");
            }
        }
        return <View style={{
            width: "100%",
            height: "100%",
            top: 0,
            left: 0,
            position: "absolute",
            // opacity: 0.8,
            ...this.props.style,
        }}>
            {/* <SGradient colors={["#000000", "#44000044"]} /> */}
            <SImage src={source} style={{
                width: "100%",
                height: "100%",
                resizeMode: "cover",
                opacity: 0.6,
            }} />
            {/* <View style={{
                width: "100%",
                height: "100%",
                top: 0,
                left: 0,
                position: "absolute",
                opacity: (0.7 + (Platform.OS == "web" ? -0.2 : 0)),
                backgroundColor: (this.props.contraste ? this.props.contraste : "#00000044")
            }}>

            </View> */}
        </View>
    }
    render() {
        // if (!this.props.source) {
        //     return <View />
        // }
        return this.getBackground()
    }
}
