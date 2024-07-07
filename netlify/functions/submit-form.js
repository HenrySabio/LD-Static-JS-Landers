exports.handler = async function (event, context) {
    const apiUrl = 'https://api.walkeradvertising.com/api/WebHookGenericPost_v2'; // Replace with your actual API URL

    try {
        console.log('Received Form Data:', event.body);
        console.log('Sending to webhook...');
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...event.headers
            },
            body: event.body
        });

        const data = await response.json();
        console.log('Webhook Response:', data);
        const result = data.message; // Replace 'result' with the actual variable containing the message
        return res.status(200).json({ message: result });
    } catch (error) {
        console.log('Error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal Server Error' })
        };
    }
};
