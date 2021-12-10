module.exports = {
	components: {
		securitySchemes: {
			bearerAuth: {
				type: 'http',
				name: 'authentication',
				scheme: 'bearer',
				bearerFormat: 'JWT',
				in: 'header',
			},
		},
		schemas: {   
			id : {
				type: "string",
				description: "A number as an unique identifier",
				example: "42"
			},
			ApiInfo: {
				type: 'object',
				properties: {
					apiStatus: {
						type: 'string',
						description: 'A short text that tells if the API is up. Obviously it is, since you can access this endpoint',
						example: 'API is running'
					},
					apiName: {
						type: 'string',
						description: 'The name of the API as stated in package.json',
						example: 'AwesomeApi'
					},
					apiDescription: {
						type: 'string',
						description: 'The description of the API as stated in package.json',
						example: 'This API exposes...'
					},
					apiVersion: {
						type: 'string',
						description: 'The version of the API as stated in package.json',
						example: '1.0.0'
					},
				}
			},			
			LoginDto: {
				type: 'object',
				properties: {
					email: {
						type: 'string',
						description: 'EMail address that identifies an user.',
						example: 'max.mustermann@fom-net.de'
					},
					password: {
						type: 'string',
						description: 'Password of the user',
						example: 'P@ssw0rd123!'
					}
				}
			},
			User: {
				type: 'object',
				properties: {
					id: {
						type: 'int',
						description: 'Unique numeric id of each user',
						example: 42
					},
					email: {
						type: 'string',
						description: 'Unique EMail address that identifies an user.',
						example: 'max.mustermann@fom-net.de'
					},
					firstname: {
						type: 'string',
						description: 'Firstname of the user',
						example: 'Max'
					},
					lastname: {
						type: 'string',
						description: 'Lastname of the user',
						example: 'Mustermann'
					},
					admin: {
						type: 'int',
						description: 'Indicator, whether the user is admin (value=1) or not',
						example: '0'
					}								
				}
			},
			NewUserDto: {
				type: 'object',
				properties: {
					email: {
						type: 'string',
						description: 'EMail address that identifies an user.',
						example: 'max.mustermann@fom-net.de'
					},
					password: {
						type: 'string',
						description: 'A top secret password',
						example: 'P@ssw0rd123!'
					},
					firstname: {
						type: 'string',
						description: 'Firstname of the user',
						example: 'Max'
					},
					lastname: {
						type: 'string',
						description: 'Lastname of the user',
						example: 'Mustermann'
					},
					admin: {
						type: 'int',
						description: 'Indicator, whether the user is admin (value=1) or not',
						example: '0'
					}								
				}
			},
			Task:{
				type: "object",
				properties: {
					id: {
						type: "int",
						description: "Task identification number",
						example: 1
					},
					user_id: {
						type: "int",
						description: "Foreign key to an user",
						example: "45"
					},
					title: {
						type: "string",
						description: "The short title of a task",
						example:"Cleaning"
					},
					description: {
						type: "string",
						description: "A detailled description of the task",
						example: "Do the dishes, vacuum the living-room, take out the garbage"
					},
					priority: {
						type: "int",
						description: "The priority of a task (-1=low, 0=normal, 1=high)",
						example: 0
					},
					status: {
						type: "int",
						description: "The status of a task (0=new, 1=progress, 2=done)",
						example: 0
					},
					due_date: {
						type: "date",
						description: "The date the task has to be finished",
						example: "2021-10-05"
					},	
					created: {
						type: "date",
						description: "The date the task was created",
						example: "2021-10-01"
					}
				}
			},
			NewTaskDto: {
				type: "object",
				properties: {
					title: {
						type: "string",
						description: "The short title of a task",
						example:"Cleaning"
					},
					description: {
						type: "string",
						description: "A detailled description of the task",
						example: "Do the dishes, vacuum the living-room, take out the garbage"
					},
					priority: {
						type: "int",
						description: "The priority of a task (-1=low, 0=normal, 1=high)",
						example: 0
					},
					due_date: {
						type: "date",
						description: "The date the task has to be finished",
						example: "2021-10-05"
					}
				}
			},
			Error: {
				type: "object",
				properties: {
					message: {
						type: "string"
					},
					internal_code: {
						type: "string"
					}
				}
			}
		}
  }
}