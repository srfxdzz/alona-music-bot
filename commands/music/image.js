const { EmbedBuilder } = require('discord.js');
const { useQueue } = require('discord-player');
const { Translate } = require('../../process_tools');

module.exports = {
    name: 'response',
    description:('Send QR or Scanner image based on target word'),
    async execute({ inter }) {
        const targetWords = ['qr', 'scanner'];
        const content = inter.content.toLowerCase();

        let responseImage;
        
        if (targetWords.includes(content)) {
            if (content === 'qr') {
                responseImage = 'path/to/qr_image.png';  // Replace with actual path to QR image
            } else if (content === 'scanner') {
                responseImage = 'path/to/scanner_image.png';  // Replace with actual path to scanner image
            }

            const embed = new EmbedBuilder()
                .setColor('#2f3136')
                .setAuthor({ name: await Translate(`Here is your ${content} image! <✅>`) })
                .setImage(responseImage);

            return inter.editReply({ embeds: [embed] });
        } else {
            return inter.editReply({ content: await Translate(`Invalid command or target word <${inter.member}>... try again ? <❌>`) });
        }
    }
}
