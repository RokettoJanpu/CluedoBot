module.exports = {
    name: `Enter the command name in lowercase without the prefix.`,
	description: `Enter your command description here. Feel free to be funny if you like.`,
	execute(message, user, atUser, toUser, query, queryString, args, mentions){
        botResponse = `Pong`;
		message.channel.send(botResponse);
		logResponse = botResponse;
	},
};
