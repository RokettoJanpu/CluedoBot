module.exports = {
	name: `murder`,
	description: `A murder, you say...?`,
	execute(message, user, atUser, toUser, query, queryString, args, mentions){
        botResponse = `:skull_crossbones: A murder, you say? I do declare! :dagger:`;
		message.channel.send(botResponse);
		logResponse = botResponse;
	},
};