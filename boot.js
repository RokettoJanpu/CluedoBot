const fs = require(`fs`);
const Discord = require(`discord.js`);

/**
 * Don't pay this too much attention if you're not one of the code authors.
 * Determines whether CluedoBot is deployed via online apps or locally.
 * It allows us to easily switch between running the bot locally and having an online app run it run 24/7
 * If it runs locally, it grabs the necessary tokens from config.json
 * If it runs via online app, it grabs the tokens from the process environment.
 */

if(process.env.PREFIX != undefined){
	var prefix = process.env.PREFIX, botToken = process.env.BOT_TOKEN, giphyKey = process.env.GIPHY_KEY;
}else{
	var {prefix, botToken, giphyKey} = require(`./config.json`);
}

// Logs in CluedoBot.
const bot = new Discord.Client();								
bot.login(botToken);

// Interfaces with Giphy's API.
var giphyAPIClient = require(`giphy-js-sdk-core`);
giphy = giphyAPIClient(giphyKey);

// Loops through the commands file and adds each command to the bot.
bot.commands = new Discord.Collection();
const commandFiles = fs.readdirSync(`./bot_commands`).filter(file => file.endsWith(`.js`));
for (const file of commandFiles) {
	const command = require(`./bot_commands/${file}`);
	bot.commands.set(command.name, command);
}

// Initializes some variables. To be explained further below.
var args, cmd, mentions, query, queryString, atUser, user, toUser, botResponse, logResponse;

// Logs this message to the console when CluedoBot boots up.
bot.once(`ready`, () => {
	bot.user.setActivity(`with knives!`);
	console.log(`A murder, you say? I do declare!`); 
})

// Runs this block whenever CluedoBot sees a new message.
bot.on(`message`, message => {

	// Exits immediately if the message doesn't start with the command prefix.
	if(!message.content.startsWith(prefix)) return; 

		/**
		 * Turns message content into Nightbot variables. For more info,
		 * go to https://docs.nightbot.tv/commands/variables
		 * Args (array) - Equivalent to $(1), $(2), $(3), etc.
		 * However, unlike Nightbot's argument variables, the message can contain 
		 * as many arguments as the user inputs. 
		 * Cmd (string) - The command name being run, without the prefix.
	 	 * Mentions (array) - Array of user mentions in the message.
	 	 * Query (string) - Equivalent to $(query)
	 	 * QueryString (string) - Equivalent to $(querystring)
	 	 * AtUser (string) - Equivalent to $(user), this will tag the user.
	 	 * User (string) - Equivalent to $(user), this will NOT tag the user.
		 * ToUser (string) - Equivalent to $(touser)
		 */

		args = message.content.split(/ +/); 
		cmd = args[0].slice(prefix.length).toLowerCase(); 
		args.shift();
		mentions = message.mentions.members.array(); 
		query = args.join(` `); 
		queryString = encodeURIComponent(query); 
		atUser = message.member; 
		user = atUser.displayName; 
		toUser = args[0]?args[0]:user; 

		// Logs the user's message to the console.
		console.log(`${user}: ${message.content}`); 

		// Exits if the command being run doesn't exist.
		if(!bot.commands.has(cmd)) return;
		
		// This section is what actually runs the command.
		try{
			// Sends arguments to the command being run.
			bot.commands.get(cmd).execute(message, user, atUser, toUser, query, queryString, args, mentions); 

			// Logs CluedoBot's response.
			console.log(`CluedoBot: ${logResponse}`); 
		}catch(error){
			console.error(error);
			message.reply(`Error!`);
		}
})
