import React, { Component } from 'react'
import Login from './login/Login';
import Dashboard from './Dashboard';

class Authentication extends Component {

	constructor(props) {
		super(props);
		this.state={
			show_login: true,
			contact_details: null,
		}
	}

	is_logged_in = (contact) => {
		this.setState({show_login: false, contact_details: contact});

	}

	render() {
		if(this.state.show_login) {
			return(
				<Login onLogin={this.is_logged_in}/>
			);
		} else {
			return(
				<Dashboard contactDetails={this.state.contact_details}/>
			);
		}
	}
}

export default Authentication;