# Los Defensaores - Static Landers - (Fully STatic with JS Only)

[![Netlify Status](https://api.netlify.com/api/v1/badges/ee6ac574-7cfe-446d-a032-73270a0d198c/deploy-status)](https://app.netlify.com/sites/ld-static-js-landers/deploys)

Project uses netlify functions to handle the form submit by proxy to the webhook.
Server side requests are not subject to CORS restrictions.

As such - ignore existing `server.js` file in the root directory.
This was used while testing requests using express server and is not used on the deployed site via netlify.

## Dev & Deploy

These landers are deployed at [staticjs.losdefensores.com](https://staticjs.losdefensores.com)
Currently host on Netlify.

This workflow requires `gulp` and `sass` to be installed globally.
Command: `npm install -g gulp sass`

At root directory, run `npm install` or `npm i` to install all dependencies.

The site can be deployed locally using the `live-server` vscode extension.

Ensure all changes are made in the `src` directory.
While making changes, run `gulp dev` to watch for changes and compile the files.

When ready to commit and push changes to the repo, run `gulp prod` to compile the files into the `dist` directory, commit, and push to the repo.