const { EmbedBuilder } = require('discord.js');
const { useQueue } = require('discord-player');
const { Translate } = require('../../process_tools');

module.exports = {
    name: 'response',
    description:('Send QR or Scanner image based on admin upload'),
    async execute({ inter }) {
        const targetWords = ['qr', 'scanner'];
        let content = inter?.options?.getString('text');  // Assuming text is a command option for input

        if (!content) {
            content = inter?.content?.toLowerCase();  // Fallback if text option is not present
        }

        let responseImage;
        
        // Check if the command sender is an admin
        if (inter.member.permissions.has('ADMINISTRATOR')) {
            if (content === 'upload') {
                // Assuming a method to upload images
                responseImage = await uploadImage(inter);  // Function to handle image upload
                return inter.editReply({ content: `Image uploaded successfully for ${content}` });
            } else if (targetWords.includes(content.toLowerCase())) {
                if (responseImage) {
                    const embed = new EmbedBuilder()
                        .setColor('#2f3136')
                        .setAuthor({ name: await Translate(`Here is your ${content} image! <✅>`) })
                        .setImage(responseImage);

                    return inter.editReply({ embeds: [embed] });
                } else {
                    return inter.editReply({ content: await Translate(`No image uploaded for ${content}. Please upload an image first.`) });
                }
            }
        } else {
            return inter.editReply({ content: await Translate(`You do not have the necessary permissions to perform this action <❌>`) });
        }
    }
}

// Example function to handle image upload
async function uploadImage(inter) {
    // Function logic to upload and return image path
    // For example, it might involve interacting with a file system or a database to store the image
    return 'path/to/qr_image.png';  // Replace with actual image handling logic
}
