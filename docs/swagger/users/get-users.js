module.exports = {
    get:{
        tags: ['User Management'],
        description: "Get users",
        operationId: 'getUsers',
        parameters:[],
        responses:{
            '200':{
                description:"User list were obtained",
                content:{
                    'application/json':{
                        schema:{
                            $ref:'#/components/schemas/User'
                        }
                    }
                }
            },
            '204':{
                description:"No users in database",
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