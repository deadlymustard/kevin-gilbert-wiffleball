# KevinGilbertWiffleballFunctions

## Build
Run `npm run build`

## Deploying
Run `firebase login` and login to the correct project.
Run `firebase use <dev|production>` to switch to the environment you'd like to deploy to.
Run `firebase deploy` to deploy the code.

## Setting Environment Variables
These functions use environment variables for connecting to mailgun. Before usage you must ensure that functions have the required env vars.
`firebase functions:config:set mailgun.api_key="<API_KEY>" mailgun.domain="<DOMAIN>"`

You can verify the params are set by running:
`functions:config:get`
