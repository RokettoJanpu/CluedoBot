module.exports = {
	name: `ping`,
	description: `Pong!`,
	execute(message, user, atUser, toUser, query, queryString, args, mentions){
        botResponse = `Pong! :ping_pong:`;
		message.channel.send(botResponse);
		logResponse = botResponse;
	},
};