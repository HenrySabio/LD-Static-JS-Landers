exports.handler = async function (event, context) {
    const apiUrl = 'https://api.walkeradvertising.com/api/WebHookGenericPost_v2'; // Replace with your actual API URL

    try {
        console.log('Received Form Data:', event.body);
        console.log('Sending to webhook...');
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(event.body),
        });

        const data = await response.json();
        console.log('Webhook Response:', data);
        console.log(data.ok);
        console.log(data.body);
        console.log(data.message);
        if (!data.ok) {
            return data.status(500).json({ error: 'Failed to forward form data to webhook' });
        } else {
            const result = data.message; // Replace 'result' with the actual variable containing the message
            return {
                status: 200,
                message: result
            }
        }
    } catch (error) {
        console.log('Error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal Server Error' })
        };
    }
};
