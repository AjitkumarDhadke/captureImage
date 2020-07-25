import React, { Component } from "react";
import axios from 'axios';
import Webcam from "react-webcam";

export class Dashboard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			contact_no: props.contactDetails,
			screenshot: null,
			errors:{screenshot_error:'', contact_no_error: ''}
		}
	}

	componentDidMount(){
		setInterval(() => { 
			let screenshot = this.webcam.getScreenshot();
			this.setState({ screenshot });
			this.sendCapureImage();
		}, 30000);
	}

	// captureBtnAction = () =>{
	// 	let screenshot = this.webcam.getScreenshot();
	// 	this.setState({ screenshot });
	// 	this.sendCapureImage();
	// }

	sendCapureImage = () =>{
		let errors = this.state.errors;
		if(!this.state.screenshot){
			errors.screenshot_error= 'screenshot is being ready';
			this.setState({errors});
		} else{
			errors.screenshot_error = '';
			this.setState({errors});
		}

		if(!this.state.contact_no){
			errors.contact_no_error= 'screenshot is being ready';
			this.setState({errors});
		} else{
			errors.contact_no_error = '';
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
			// console.log('yes errors'+ error_count + ' ==> '+ JSON.stringify(this.state.errors))
		} else{
			// console.log('no errors'+ error_count + ' ==> '+ JSON.stringify(this.state.errors));
			let data = new FormData()
			data.append('contact_no', this.state.contact_no)
			data.append('image', this.state.screenshot)
			axios.post("http://localhost:1337/storeImage", data, { 
			})
			.then(res => {
				console.log(res.result)
			})
		}
	}

	render() {
		return (
			<div className="d-flex align-items-center flex-column justify-content-center m-auto alert alert-secondary">
				<div className="my-2 ">
					<h2><i><b>Wel-Come to Dashboard</b></i></h2>
				</div>
				<div className="col-md-4 d-flex align-items-center flex-column justify-content-center">
					<Webcam audio={false} ref={node => this.webcam = node}/>
				</div>

				<div className="my-2 ">
					<i><b>captured preview : </b></i>
				</div>

				<div className='screenshots d-flex align-items-center flex-column justify-content-center'>
					{/* <div className='controls'>
					<button onClick={this.captureBtnAction}>capture</button>
					</div> */}
					{this.state.screenshot ? <img src={this.state.screenshot} /> : null}
				</div>
			</div>
		);
	}
}
export default Dashboard;


