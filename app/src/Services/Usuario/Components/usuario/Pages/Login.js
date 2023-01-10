import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SPage, SText } from 'servisofts-component';

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}

	render() {
		return (
			<SPage title={'Login'}>

				<SText>{'Login'}</SText>

			</SPage>
		);
	}
}
const initStates = (state) => {
	return { state }
};
export default connect(initStates)(Login);