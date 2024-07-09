# Los Defensaores - Static Landers - (Fully STatic with JS Only)

[![Netlify Status](https://api.netlify.com/api/v1/badges/ee6ac574-7cfe-446d-a032-73270a0d198c/deploy-status)](https://app.netlify.com/sites/ld-static-js-landers/deploys)

Project uses netlify functions to handle the form submit by proxy to the webhook.
Server side requests are not subject to CORS restrictions.

As such - ignore existing `server.js` file in the root directory.
This was used while testing requests using express server and is not used on the deployed site via netlify.

## Deploy

These landers are deployed at [staticjs.losdefensores.com](https://staticjs.losdefensores.com)
Currently host on Netlify.