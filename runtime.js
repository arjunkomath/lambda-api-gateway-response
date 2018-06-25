let runtime = null;
if (process.env.AWS_EXECUTION_ENV) {
	runtime = process.env.AWS_EXECUTION_ENV.replace("AWS_Lambda_", "")
}

module.exports = runtime