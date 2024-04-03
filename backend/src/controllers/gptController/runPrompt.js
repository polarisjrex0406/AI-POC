const OpenAI = require("openai");
require('dotenv').config();
const openai = new OpenAI({
    apiKey: process.env['OPEN_API_KEY'],
});

exports.runPrompt = async (prompt) => {
    if (!prompt) {
        return {
          message: "Template data can not be empty!"
        };
    }
    // Use req.body as the input for OpenAI API
    const { messages = [], Chatgpt_settings = {} } = prompt;
    // console.log(messages);
    // console.log(Chatgpt_settings);
    // Call OpenAI API to generate completions
    try {
        const response = await openai.chat.completions.create({
            messages: messages,
            ...Chatgpt_settings,
        });

        const generatedText = response.choices[0].message;

        return {
            message: 'Experiment has done successfully.',
            data: {
                input: {
                    messages: messages,
                    Chatgpt_settings
                },
                output: generatedText,
            },
        };
    } catch (error) {
        console.error('OpenAI API error:', error);
        return {
            message: 'Error generating completions with OpenAI API.',
            error: error.message,
        };
    }
};