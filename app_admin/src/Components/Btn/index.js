import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { SText } from 'servisofts-component'

export default class Btn extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    getValue() {
        return this.state.suma;
    }
    esconderse() {
        this.setState({
            hidden: true
        })
    }
    render() {

        if (this.props.suma) {
            var suma = 0;
            this.props.suma.map((v) => {
                suma += v;
            })
            if (this.state.suma != suma) {
                this.setState({
                    suma: suma
                })
            }
        }

        if(this.state.hidden) return null;
        return (
            <View>
                <SText>LA SUMA DE LOS VALORES ES: {this.state?.suma}</SText>
            </View>
        )
    }
}