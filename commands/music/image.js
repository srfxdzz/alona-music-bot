const { EmbedBuilder } = require('discord.js');
const { useQueue } = require('discord-player');
const { Translate } = require('../../process_tools');

// commands/image.js
// Target words and image paths (or URLs)
const targetWords = {
    'qr': 'images/qr-code.png', 
    'scanner': 'images/scanner-image.jpg',
    // Add more target words and image paths here
};

module.exports = {
    name: 'image', // You can change the command name if you want
    description: 'Send an image based on a keyword',
    execute(message, args) {
        if (message.author.bot) return;

        const command = message.content.slice(message.client.prefix.length).trim().split(/ +/)[0].toLowerCase(); // Get the command word

        if (command === 'addimage') {
            // Admin-only command to add target words and images
            if (message.member.hasPermission('ADMINISTRATOR')) { 
                if (args.length < 2) {
                    return message.reply('Usage: `!addimage <target_word> <image_path_or_url>`');
                }
                const targetWord = args[1].toLowerCase();
                const imagePath = args[2];
                targetWords[targetWord] = imagePath;
                message.reply(`Added target word "${targetWord}" with image: ${imagePath}`);
            } else {
                message.reply('You do not have permission to use this command.');
            }
        } else if (targetWords.hasOwnProperty(command)) {
            // Send the image if the command matches a target word
            const imagePath = targetWords[command];
            message.reply({ files: [imagePath] }); 
        }
    },
};
