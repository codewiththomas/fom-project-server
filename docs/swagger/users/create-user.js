module.exports = {
	post: {
		tags:['User Management'],
		description: "Endpoint to create a new **User**. Admin role required!",
		operationId: "createUser",
		parameters: [],
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