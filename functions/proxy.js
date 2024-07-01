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
        return {
            statusCode: response.status,
            body: JSON.stringify(data),
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            }
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal Server Error' })
        };
    }
};
