module.exports = {
	post: {
		tags:['Auth'],
		description: "Login",
		operationId: "login",
		parameters:[],
		requestBody: {
			required: true,
			content: {
				'application/json': {
					schema: {
						$ref:'#/components/schemas/LoginDto'
					}
				}
			}
		},
		responses: {
			'200': {
				description: "Login successful"
			},
			'401': {
				description: "Password invalid"
			},
			'404': {
				description: "User not found"
			},
			'500': {
				description: 'Server error'
			}
		}
  }
}