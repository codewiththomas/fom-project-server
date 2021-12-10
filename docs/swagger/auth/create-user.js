module.exports = {
	post: {
		tags:['Auth'],
		description: "Adds an new user to the database. Admin role required!",
    operationId: "createUser",
    parameters:[],
    requestBody: {
			required: true,
			content:{
				'application/json': {
					schema:{
						$ref:'#/components/schemas/NewUserDto'
					}
				}
			}
		},
		responses: {
			'201': {
				description: "User created successfully"
			},
			'400': {
				description: "Required fields missing or password too short"
			},
			'409': {
				description: "User already exists"
			},
			'500': {
				description: 'Server error'
			}
		},
		security: [
			{
				bearerAuth: [],
			},
		],	
	}
}