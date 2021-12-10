module.exports = {
    get:{
        tags: ['Tasks'],
        description: "Get tasks",
        operationId: 'getTasks',
        parameters:[],
        responses:{
            '200':{
                description:"Tasks were obtained",
                content:{
                    'application/json':{
                        schema:{
                            $ref:'#/components/schemas/Task'
                        }
                    }
                }
            },
            '204':{
                description:"There are no tasks for the user",
                content:{
                    'application/json':{
												schema: {
													type: "array",
													items: {
														type: "string"
													},
          										
													description: "An empty array",
													example: "[]"
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