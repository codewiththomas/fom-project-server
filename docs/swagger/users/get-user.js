module.exports = {
	get: {
		tags:['User Management'],
		description: "Get a single user by its id",
		operationId: "getUser",
		parameters: [
			{
				name:"id",
				in:"path",
				schema: {
					$ref: "#/components/schemas/id"
				},
				required: true,
				description: "A single user id"
			}
		],
		responses:{
			'200':{
				description:"User is obtained",
				content:{
					'application/json':{
						schema:{
							$ref:"#/components/schemas/User"
						}
					}
				}
			},
			'404':{
				description: "User not found",
				content:{
					'application/json':{
						schema:{
							$ref:'#/components/schemas/Error',
							example:{
								message: "User not found"
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