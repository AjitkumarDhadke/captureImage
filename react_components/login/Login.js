import React, { Component } from 'react'
import Modal from 'react-bootstrap/Modal';
import RegistrationModal from './RegistrationModal.js'
import axios from 'axios';

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isRegistrationModalShow: false,
			contact_no: '',
			password: '',
			errors: {contact_no_error:'', password_error: ''},
		};
	}

	registerBtnAction = () => {
		this.setState ({
			isRegistrationModalShow: true,
		});
	}

	closeRegistrationModal = () =>{
		this.setState ({
			isRegistrationModalShow: false
		});
	}

	contactNoAction = (event) => {
		this.setState({contact_no: event.target.value});
	}

	passwordAction = (event) => {
		this.setState({password: event.target.value});
	}

	loginBtnAction = () =>{
		let errors = this.state.errors;
		if(!this.state.contact_no){
			errors.contact_no_error= 'contact number is required';
			this.setState({errors});
		} else if (this.state.contact_no.length != 10){
			errors.contact_no_error = 'contact number is not appropriate';
			this.setState({errors});
		} else{
			errors.contact_no_error = '';
			this.setState({errors});
		}

		if(!this.state.password){
			errors.password_error= 'password is required ';
			this.setState({errors});
		} else{
			errors.password_error = '';
			this.setState({errors});
		}

		let error_count = Object.keys(errors).filter((key) =>{
			if(errors[key]){
				return false;
			} 
				return true;
		}).length;
		let error_type_count = Object.keys(errors).length;
		if (error_count < error_type_count){
			console.log('yes errors'+ error_count + ' ==> '+ JSON.stringify(this.state.errors))
		} else{

			axios.get("http://localhost:1337/getUserAuthentication", {
				params: {
					contact_no: this.state.contact_no, password: this.state.password
				}
			})
			.then((response) => {
				// console.log('succccses user ===> '+ JSON.stringify(response));
				if(response.data.userAuthentication == null) {
					Swal.fire({
						title: 'Invalid user credentials',
						width: 600,
						padding: '3em',
						background: 'rgba(255,255,255,0.4)',
						backdrop: `rgba(218,84,46,0.4)
							left top
							no-repeat`
						})
				} else{
					this.props.onLogin(response.data.userAuthentication.contact_no);
				}
			}).catch((error) => {
				console.log('error' + error);
			});
		}
	}

	render() {
		return (
			<div>
			<div className="auth-wrapper d-flex no-block justify-content-center align-items-center bg-dark">
				<div className="auth-box border-top border-secondary">
					<div className="col-12 m-auto">
						<i><b>Enter your user information and click 'Login'</b></i>
					</div>

					<div className="row p-b-10">
						<div className="input-group mb-3">
							<div className="input-group-prepend">
								<span className="input-group-text bg-success text-white" id="basic-addon1"><i className="ti-user" />
								</span>
							</div>
							<input className="form-control form-control-lg" type="number" placeholder="10 Digit Contact Number" aria-label="Contact Number" aria-describedby="basic-addon1" autoComplete="off" required style={{backgroundColor: 'palegoldenrod'}} onChange={this.contactNoAction}/>
							<label className="col-md-12 text-danger" style={{fontSize: "14px",fontWeight:" 400"}}>
								{this.state.errors.contact_no_error ? this.state.errors.contact_no_error : ""}
							</label>
						</div>
						<div className="input-group mb-3">
							<div className="input-group-prepend">
								<span className="input-group-text bg-warning text-white" id="basic-addon2">
									<i className="ti-pencil" />
									</span>
							</div>
							<input className="form-control form-control-lg" type="password" placeholder="Password" aria-label="Password" aria-describedby="basic-addon1" name="password" autoComplete="off" required style={{backgroundColor: 'palegoldenrod'}} onChange={this.passwordAction}/>
							<label className="col-md-12 text-danger" style={{fontSize: "14px",fontWeight:" 400"}}>
								{this.state.errors.password_error ? this.state.errors.password_error : ""}
							</label>
						</div>
					</div>

					<div className="col-12 m-auto">
						<i><b>If not a user then register first</b></i>
					</div>

					<div className="row border-top border-secondary">
						<div className="col-md-12 my-3">
							<button className="btn btn-success float-right" onClick={this.loginBtnAction}>Login</button>
							<button className="btn btn-success float-left" onClick={this.registerBtnAction}>Register</button></div>
							<Modal show={this.state.isRegistrationModalShow} onHide={this.closeAddNewAWBModal}>
								<RegistrationModal closeRegistrationModal={this.closeRegistrationModal} />
							</Modal>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Login;