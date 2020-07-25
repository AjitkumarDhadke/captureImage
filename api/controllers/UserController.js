/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

	getUserDetails: async function(req, res){
		// console.log('getUserDetails data => '+ JSON.stringify(req.query));
		let userData = await UserDetails.findOne({where:{ 'contact_no' : req.query.contact_no}}).catch(err => console.log( err.message));

		// console.log("user data = = :" + JSON.stringify(userData));
		if (userData){
			res.json({userData: userData});
		} else{
			res.json({userData: null});
		}
	},

	getUserAuthentication: async function(req, res){
		// console.log('getUserAuthentication data query => '+ JSON.stringify(req.query));
		let userAuthentication = await UserDetails.findOne({where:{ 'contact_no' : req.query.contact_no, 'password': req.query.password}}).catch(err => console.log( err.message));

		// console.log("getUserAuthentication data = = :" + JSON.stringify(userAuthentication));
		if (userAuthentication){
			res.json({userAuthentication: userAuthentication});
		} else{
			res.json({userAuthentication: null});
		}
	},

	registerNewUser: async function(req,res){
			// console.log('registerNewUser body'+JSON.stringify(req.body));
			if(req.body){
				if(!req.body.user_name){
					return res.send({
						error: 'user_name is missing to perform registerNewUser',
					});
				} else if(!req.body.contact_no || req.body.contact_no.length != 10){
					return res.send({
						error: 'contact_no is missing to perform registerNewUser',
					});
				} else if(!req.body.password){
					return res.send({
						error: 'password is missing to perform registerNewUser',
					});
				} else{
					let createUser = await UserDetails.create({user_name: req.body.user_name, contact_no: req.body.contact_no, password: req.body.password, user_image: []}).fetch().catch(err => console.log(err));

					// console.log('createdUser  is '+ JSON.stringify(createUser));
					res.json({result: createUser});
				}
			}
		},

	storeImage: async function(req,res){
			// console.log('registerNewUser body'+JSON.stringify(req.body));
			if(req.body){
				if(!req.body.contact_no){
					return res.send({
						error: 'contact_no is missing to perform imageStore',
					});
				} else if(!req.body.image){
					return res.send({
						error: 'image is missing to perform imageStore',
					});
				} else{
					let existingRecord = await UserDetails.findOne({contact_no: req.body.contact_no}).catch(err => console.log(err));

					let existingImages = [];
					let updatedImages = {};
					if(existingRecord){
						if(existingRecord.user_images == null){
							updatedImages.image = req.body.image;
							existingImages.push(updatedImages);
						}
						else{
							existingImages = existingRecord.user_images;
							updatedImages.image = req.body.image;
							existingImages.push(updatedImages);
						}
					}
					 else{
						updatedImages.image = req.body.image;
						existingImages.push(updatedImages);
					}

					let storeImage = await UserDetails.update({contact_no: req.body.contact_no}).set({user_images: existingImages}).fetch().catch(err => console.log(err));
					storeImage = storeImage[0];

					console.log('storeImage  is '+ JSON.stringify(storeImage));
					res.json({result: storeImage});
				}
			}
		},
};