import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SPage, SText } from 'servisofts-component';

class NuevoPass extends Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}

	render() {
		return (
			<SPage title={'NuevoPass'}>

				<SText>{'NuevoPass'}</SText>

			</SPage>
		);
	}
}
const initStates = (state) => {
	return { state }
};
export default connect(initStates)(NuevoPass);