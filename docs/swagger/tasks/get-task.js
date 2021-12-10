module.exports = {
	get: {
		tags:['Tasks'],
		description: "Get a task by its id",
		operationId: "getTask",
		parameters: [
			{
				name:"id",
				in:"path",
				schema: {
					$ref: "#/components/schemas/id"
				},
				required: true,
				description: "A single task id"
			}
		],
		responses:{
			'200':{
				description:"Task is obtained",
				content:{
					'application/json':{
						schema:{
							$ref:"#/components/schemas/Task"
						}
					}
				}
			},
			'404':{
				description: "Task is not found",
				content:{
					'application/json':{
						schema:{
							$ref:'#/components/schemas/Error',
							example:{
								message: "Task not found"
							}
						}
					}
				}
			},
			'500':{
				description: "Internal Error",
				content:{
					'application/json':{
						schema:{
							$ref:'#/components/schemas/Error',
							example:{
								message:"Internal Error"
							}
						}
					}
				}
			}
		},
		security: [
			{
				bearerAuth: [],
			},
		],	
  }
}