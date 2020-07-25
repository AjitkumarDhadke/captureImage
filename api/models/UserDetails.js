/**
* UserDetails.js
*
* @description :: A model definition represents a database table/collection.
* @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
*/

module.exports = {

	attributes: {
		user_name:			{type: 'string', required: true },
		contact_no:			{type: 'string', required: true, unique: true },
		password:			{type: 'string', required: true },
		user_images:		{type: 'json', columnType: 'array' },
	},
};