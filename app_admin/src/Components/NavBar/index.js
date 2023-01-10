import React, { Component } from 'react'
import { SIcon, SNavigation, SText, STheme, SView } from 'servisofts-component'
import RContent from './RContent';

export default class NavBar extends React.Component {

  btnBack() {
    if (this.props.preventBack) return;
    if (!SNavigation.isBack()) return;
    return <SView col={"xs-12"} height style={{
      justifyContent: 'center',
    }}>
      <SView onPress={() => {
        SNavigation.goBack();
      }} style={{
        maxWidth: 35,
      }} center height>
        <SIcon width={25} height={25} name={"Arrow"} fill={STheme.color.secondary} />
      </SView>
    </SView>
  }
  render() {
    return (
      <SView col={"xs-12"} height={40} backgroundColor={STheme.color.barColor}>
        <SView col={"xs-12"} height row>
          <SView width={90}>
            {this.btnBack()}
          </SView>
          <SView flex center>
            <SText color={STheme.color.secondary}>{this.props?.title}</SText>
          </SView>
          <SView width={90} height center
            onPress={() => {
              SNavigation.reset("/");
            }}>
            <RContent />
          </SView>
        </SView>
      </SView >
    )
  }
}