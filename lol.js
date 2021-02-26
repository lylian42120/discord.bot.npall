const Discord = require("discord.js");

const Client = new Discord.Client;

const prefix = "-";

Client.on("ready", () => {
   console.log("bot opérationnel");
});

Client.login(process.env.TOKEN);

Client.on("message", message => {
    
    if(message.member.permissions.has("MANAGE_MESSAGES")){
        if(message.content.startsWith(prefix + "clear")){
            let args = message.content.split(" ");

            if(args[1] == undefined){
                message.reply("**Nombre de message non ou mal défini.**");
            }
            else {
                let number = parseInt(args[1]);

                if(isNaN(number)){
                    message.reply("**Nombre de message non ou mal défini.**");
                }
                else {
                    message.channel.bulkDelete(number).then(messages => {
                        console.log("Suppression de " + message.size + " message reussi !");
                    }).catch(err => {
                        console.log("Erreur de clear : " + err);
                    });
                }
            }
        } 
            
    }
    if(message.author.bot) return;

    var embed = new Discord.MessageEmbed()
   .setColor("#0099ff")
   .setTitle("help menu")
   .setDescription("__**prefix:  -**__\n\n``help :`` **donne la liste des commandes**\n\n__**commande membre**__\n\n``ping :`` **répond pong**\n``compliment :`` **vous dit un mot gentil**\n``clan :`` **Vous donne votre futur clan d'animé**\n\n__**commande admin**__\n\n``ban :`` **permet de bannnir des gens**\n``kick :`` **permet de kick des gens**\n``clear (nombre):`` **permet de clear les messages**")
   .setAuthor("PepitoBot", "https://lh3.googleusercontent.com/proxy/5h848x5ORcJfoMnuAZVs6xsRqm6sC3m3yVhhwNmasrpN3DH03D-g1ktKnc5RwFosAWWQ4HLVpuN8iiIus7n2N5_-_TD6KpMz4yVvtDhBN3A")
   .setFooter("page des commandes")
   .setTimestamp()
   .setThumbnail("https://lh3.googleusercontent.com/proxy/MvI_EZifChTeqfOxMB9vzja7Lk4TODBoFxOuuseJOeaEs8MBDegwNq6ul6eOMiiZIex3Qs_sxhwAQtjnZhpLw6LOY5Z8lbo6bUCelavUGaM")
   if(message.content == prefix + "help")
   

    message.channel.send(embed)
    if(message.channel.type == "dm") return;

    if(message.content == prefix + "ping") return message.channel.send("**pong ping pong sport d'enculé ouais !**")       
    
    if(message.member.hasPermission("ADMINISTRATOR")){
        if(message.content.startsWith( prefix + "ban")){
            let mention = message.mentions.members.first();

            if(mention == undefined){
                message.reply("**Membre non ou mal mentionné**");
            }
            else {
                if(mention.bannable){
                    mention.ban();
                    message.channel.send(mention.displayName + " ** a été banni avec succès !**");
            }
                
                else {
                    message.reply("**Impossible de bannir ce membre.**");
                }

            }
        }
        
        else if(message.content.startsWith(prefix + "kick")){
            let mention = message.mentions.members.first();

            if(mention == undefined){
                message.reply("**Membre non ou mal mentionné**");
            }
            else {
                if(mention.kickable){
                   mention.kick();
                   message.channel.send(mention.displayName + "**a été kick avec succès !**");
               }
               else {
                   message.reply("**Impossible de kick ce membre.**");
               }
           }
        }
    }       
});



Client.on("guildMemberAdd", member => {
    console.log("Un nouveau membre est arrive")
    member.roles.add("")
});

Client.on("message", message => {
    if(message.content === prefix + "clan"){
        let tab = [
            "**tu fais maintenant partie du clan ``uzumaki`` !**",
            "**tu fais maintenant partie du clan ``hyuga`` !**",
            "**tu fais maintenant partie du clan ``uchiwa`` !**",
            "**tu fais maintenant partie du clan ``lee`` !**",            
            "**tu fais maintenant partie du clan ``hatake`` !**",
            "**tu fais maintenant partie du clan ``otsutskui`` !**",
            "**tu fais maintenant partie du clan ``sneju`` !**",
            "**tu fais maintenant partie du clan ``akimichi`` !**",
            "**tu fais maintenant partie du clan ``sarutobi`` !**",
            "**tu fais maintenant partie du clan ``aburame`` !**",
            "**tu fais maintenant partie du clan ``inuzuka`` !**",
            "**tu fais maintenant partie du clan ``yamanaka`` !**",
            "**tu fais maintenant partie du clan ``nara`` !**"
        ]
        let index = Math.floor(Math.random() * (tab.length - 1))
        message.channel.send(tab[index])
    }
});

Client.on("message", message => {
    if(message.content === prefix + "compliment"){
        let tab = [
            " **est un beau gosse !**",
            " **tu es carismatique !**",
            " **tu es intelligent !**",
            " **je suis sur que tu as de la reussite avec les filles !**",
            " **t'es trop bg aujourd'hui !**",
            " **t'es super bien habillé !**",
            " **t'a des muscles !**",
        ]
        let index = Math.floor(Math.random() * (tab.length - 1))
        message.channel.send(message.author.username + tab[index])
    }
});

Client.on('message', message => {
    const member = message.member; 
    switch(message.content.toLowerCase()){
        case (prefix + "unban"):
    if(member.hasPermission('ADMINISTRATOR')){ 
        async function ubAll(){
        const users = await message.guild.fetchBans()
        for (const user of users.array()) {
        await message.guild.unban(user)
        }
    }
message.reply("**tous les utilisateurs sont maintenant unban !**")
        }
    if(!member.hasPermission('ADMINISTRATOR')){
        message.reply("**tu n'a pas la permission d'utiliser cette commande !**")
    }
    }
})

