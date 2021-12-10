module.exports = {
	post: {
		tags:['Tasks'],
		description: "Endpoint to create a new **Task**",
		operationId: "createTask",
		parameters: [],
		requestBody: {
			required: true,
			content:{
				'application/json': {
					schema:{
						$ref:'#/components/schemas/NewTaskDto'
					}
				}
			}
		},
		responses: {
			'201': {
				description: "Task created successfully"
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