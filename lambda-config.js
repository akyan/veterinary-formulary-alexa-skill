module.exports = {
	accessKeyId: process.env['AWSAccessKeyId'],
	secretAccessKey: process.env['AWSAccessKey'],
	region: 'eu-west-1',
	handler: 'index.handler',
	role: 'arn:aws:iam::979779020614:role/VetenaryFomularyAlexaSkillRole',
	functionName: 'VetenaryFormularyAlexaSkill',
	timeout: 10,
	memorySize: 128,
	publish: true,
	runtime: 'nodejs6.10'
};