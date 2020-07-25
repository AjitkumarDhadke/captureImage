import React, { Component } from "react";
import axios from 'axios';

export class RegistrationModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user_name: '',
			contact_no: '',
			password: '',
			conf_password: '',
			errors: {user_name_error: '', contact_no_error:'', password_error: '', conf_password_error: '' },
		}
	}

	contactNumberAction = (event) => {
		let contactNo =  event.target.value;
		if (contactNo.length == 10){
			this.setState({contact_no: contactNo});
			axios.get("http://localhost:1337/getUserDetails", {
				params: {
					contact_no: contactNo
				}
			})
			.then((response) => {
				if(response.data.userData == null){
					console.log('can add this user data =-> ');
				}
				else {
					console.log('you cannot add this user');
					Swal.fire({
						title: 'This Contact Number Already Registered',
						width: 600,
						padding: '3em',
						background: 'rgba(255,255,255,0.8)',
						backdrop: `rgba(218,84,46,0.4)
							left top
							no-repeat`
						})
					this.onCloseModal();
				}
			});
		}
	}


	userNameAction = (event) => {
		this.setState({user_name: event.target.value});
	}

	passwordAction = (event) => {
		this.setState({password: event.target.value});
	}

	confPasswordAction = (event) => {
		this.setState({conf_password: event.target.value});
	}

	registerUserAction = () =>{
		let errors = this.state.errors;
		if(!this.state.user_name){
			errors.user_name_error= 'user name is required';
			this.setState({errors});
		} else{
			errors.user_name_error = '';
			this.setState({errors});
		}
		
		if(!this.state.contact_no){
			errors.contact_no_error= 'contact number is required';
			this.setState({errors});
		}
		if (this.state.contact_no.length != 10){
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

		if(!this.state.conf_password){
			errors.conf_password_error= 'required field';
			this.setState({errors});
		} else if (this.state.conf_password != this.state.password){
			errors.contact_no_error = 'password mismatch';
			this.setState({errors});
		} else{
			errors.conf_password_error = '';
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
			// console.log('no errors'+ error_count + ' ==> '+ JSON.stringify(this.state.errors));
			let data = new FormData()
			data.append('user_name', this.state.user_name)
			data.append('contact_no', this.state.contact_no)
			data.append('password', this.state.password)
			axios.post("http://localhost:1337/registerNewUser", data, { 
			})
			.then(res => {
				console.log(res.result)
				this.onCloseModal();
			})
		}
	}

	onCloseModal = (event) =>{
		this.props.closeRegistrationModal();
	}
	
	render() {
		
		return (
			<div>
				<div className="modal-header">
					<h4 className="modal-title">
						<span>
							<i className="fa fa-edit"></i>
						</span>
						<label className="ml-2" id="registrationModalEditTitle">Registration Form</label>
					</h4>
					<button className="close" type="button" onClick={this.onCloseModal}>×</button>
				</div>

				<div className="modal-body">
					<div className="col-md-12" id="registrationModalUserName">
						<label className="control-label">User Name</label>
						<input className="form-control form-white" id="registrationModalUserNameInput" placeholder="Enter User Name" type="text" autoComplete="off" required="" onChange={this.userNameAction}/>
						<label className="col-md-12 text-danger" style={{fontSize: "14px",fontWeight:" 400"}}>
							{this.state.errors.user_name_error ? this.state.errors.user_name_error : ""}
						</label>
					</div>
					<div className="col-md-12" id="registrationModalContactNumber">
						<label className="control-label">Contatct Number</label>
						<input className="form-control form-white" id="registrationModalContactNumberInput" placeholder="Enter 10 Digit Contact Number" type="number" autoComplete="off" required="" onChange={this.contactNumberAction}/>
						<label className="col-md-12 text-danger" style={{fontSize: "14px",fontWeight:" 400"}}>
							{this.state.errors.contact_no_error ? this.state.errors.contact_no_error : ""}
						</label>
					</div>
					<div className="col-md-12" id="registrationModalPassword">
						<label className="control-label">Password</label>
						<input className="form-control form-white" id="registrationModalPasswordInput" placeholder="Enter Password" type="password" autoComplete="off" required="" onChange={this.passwordAction}/>
						<label className="col-md-12 text-danger" style={{fontSize: "14px",fontWeight:" 400"}}>
							{this.state.errors.password_error ? this.state.errors.password_error : ""}
						</label>
					</div>
					<div className="col-md-12" id="registrationModalConfPassword">
						<input className="form-control form-white" id="registrationModalConfPasswordInput" placeholder="Confirm Password" type="password" autoComplete="off" required="" onChange={this.confPasswordAction}/>
						<label className="col-md-12 text-danger" style={{fontSize: "14px",fontWeight:" 400"}}>
							{this.state.errors.conf_password_error ? this.state.errors.conf_password_error : ""}
						</label>
					</div>
				</div>

				<div className="modal-footer col-md-12">
					<button className="btn btn-success waves-effect waves-light save-category" id="registrationModalRegisterUserBtn" type="button" onClick={this.registerUserAction}>
						<i className="fas fa-save" aria-hidden="true"></i>&nbsp;&nbsp;Register User
					</button>
				</div>
			</div>
		);
	}
}
export default RegistrationModal;