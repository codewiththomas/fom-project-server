module.exports = {
	patch: {
		tags: ['Tasks'],
		description: "Updates specific fields of a task.",
		operationId: "updateTask",
		parameters: [
			{
				name: "id",
				in: "path",
				schema: {
					$ref:"#/components/schemas/id"
				},
				required:true,
				description: "Id of task to be updated"
			}
		],
		requestBody: {
			description: "Only fields that need an update have to be provided",
			content: {
				'application/json': {
					schema:{
						$ref:'#/components/schemas/NewTaskDto'
					}
				}
			}
		},		
		responses: {
			'200': {
				description: "Task updated successfully"
			},
			'400': {
				description: "Bad request"
			},
			'404': {
				description: "Task not found"
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