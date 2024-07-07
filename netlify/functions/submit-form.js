const fetch = require('node-fetch');

exports.handler = async function (event, context) {
    const apiUrl = 'https://api.walkeradvertising.com/api/WebHookGenericPost_v2'; // Replace with your actual API URL

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...event.headers
            },
            body: event.body
        });

        const data = await response.json();
        const result = data.message; // Replace 'result' with the actual variable containing the message
        return res.status(200).json({ message: result });
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal Server Error' })
        };
    }
};
