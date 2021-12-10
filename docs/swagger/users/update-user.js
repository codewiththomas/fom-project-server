module.exports = {
	patch: {
		tags: ['User Management'],
		description: "Updates specific fields of an user.",
		operationId: "updateUser",
		parameters: [
			{
				name: "id",
				in: "path",
				schema: {
					$ref:"#/components/schemas/id"
				},
				required:true,
				description: "Id of user to be updated"
			}
		],
		requestBody: {
			description: "Only fields that need an update have to be provided",
			content: {
				'application/json': {
					schema:{
						$ref:'#/components/schemas/NewUserDto'
					}
				}
			}
		},		
		responses: {
			'200': {
				description: "User updated successfully"
			},
			'400': {
				description: "Bad request"
			},
			'404': {
				description: "User not found"
			},
			'409': {
				description: "The id provided by the path differs from the id in body"
			},
			'500': {
				description: "Server error"
			}
		},
		security: [
			{
				bearerAuth: [],
			},
		],	
	}
}