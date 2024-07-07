const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const port = process.env.PORT || 3001;

// Middleware to handle CORS
app.use(cors());
// Middleware to parse JSON bodies
app.use(express.json());
// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'dist' folder
app.use(express.static(path.join(__dirname, 'dist')));

// Handle form submission (POST request)
app.post('/submit-form', async (req, res) => {
    const formData = req.body;

    console.log('submission recieved');

    // Your existing form handling logic goes here
    try {
        // Log the form data received
        console.log('Received Form Data:', formData);

        // Your webhook URL
        const webhookUrl = 'https://api.walkeradvertising.com/api/WebHookGenericPost_v2';

        // Forward the form data to the webhook endpoint
        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        console.log(response);

        // Check if the webhook request was successful
        if (response.ok) {
            const result = await response.json();
            console.log('Webhook response:', result);

            // Optionally, handle response and send confirmation to client
            res.status(200).json({ message: result });
        } else {
            console.error('Failed to forward form data to webhook');
            res.status(500).json({ error: 'Failed to forward form data to webhook' });
        }
    } catch (error) {
        console.error('Error handling form submission:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Example route
app.get('/api/data', (req, res) => {
    // Handle API requests or proxy requests here
    res.json({ message: 'Hello from Express!' });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
