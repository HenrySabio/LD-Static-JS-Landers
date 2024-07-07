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
            body: event.body,
        });

        const res = await response.json();
        console.log(response);
        console.log(response.status);
        console.log('Webhook Response:', res);
        if (response.status !== 200) {
            return {
                status: response.status,
                message: 'An error occurred while sending the form data to the webhook. Please try again.'
            }
        } else {
            return {
                status: response.status,
                message: res
            };
        }
    } catch (error) {
        console.log('Error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal Server Error' })
        };
    }
};
