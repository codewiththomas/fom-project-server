module.exports = {
	get: {
		tags: ['META'],
		description: "Whatever is in the test function at the time running",
		operationId: 'test',
    parameters: [],
    responses: {
			'200': {
				description:"Test successful"
			}
		}
	}
}