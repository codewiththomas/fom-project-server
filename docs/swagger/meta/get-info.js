module.exports = {
	get: {
		tags: ['META'],
		description: "Get general information about the API. EndPoint can be used for testing, since it doesn't require authentication.",
		operationId: 'getInfo',
    parameters: [],
    responses: {
			'200': {
				description:"Info were obtained",
				content: {
					'application/json': {
						schema: {
							$ref:'#/components/schemas/ApiInfo'
						}
					}
				}
			}
		}
	}
}