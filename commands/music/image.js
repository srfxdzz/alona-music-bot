const { EmbedBuilder } = require('discord.js');
const { useQueue } = require('discord-player');
const { Translate } = require('../../process_tools');

module.exports = {
    name: 'response',
    description:('Send QR or Scanner image based on target word'),
    async execute({ inter }) {
        const targetWords = ['qr', 'scanner'];
        let content = inter?.options?.getString('text');  // Assuming text is a command option for input

        if (!content) {
            content = inter?.content?.toLowerCase();  // Fallback if text option is not present
        }

        let responseImage;
        
        if (content && targetWords.includes(content.toLowerCase())) {
            if (content.toLowerCase() === 'qr') {
                responseImage = 'path/to/qr_image.png';  // Replace with actual path to QR image
            } else if (content.toLowerCase() === 'scanner') {
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
