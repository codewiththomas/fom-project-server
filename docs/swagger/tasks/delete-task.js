module.exports = {
	delete:{
		tags: ['Tasks'],
		description: "Deleting a task",
		operationId: "deleteTask",
		parameters:[
				{
						name:"id",
						in:"path",
						schema:{
								$ref:"#/components/schemas/id"
						},
						required:true,
						description: "Deleting a done task"
				}
		],
		responses:{
				'200':{
						description:"Task deleted successfully"
				},
				'404':{
						description:"Task not found"
				},
				'500':{
						description:"Server error"
				}
		},
		security: [
			{
				bearerAuth: [],
			},
		],	
	}
}