module.exports = {
	delete:{
		tags: ['User Management'],
		description: "Deleting an user",
		operationId: "deleteUser",
		parameters:[
				{
						name:"id",
						in:"path",
						schema:{
								$ref:"#/components/schemas/id"
						},
						required:true,
						description: "ID of the user to delete"
				}
		],
		responses:{
				'200':{
						description:"User deleted successfully"
				},
				'404':{
						description:"User not found"
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