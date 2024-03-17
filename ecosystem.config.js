module.exports = {
	apps: [
		{
			name: "web.jotion",
			port: 8080,
			script: "yarn",
			args: "start",
			env: {
				NODE_ENV: "production"
			}
		}
	]
};
