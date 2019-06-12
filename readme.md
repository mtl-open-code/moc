# moc

This is a proof of concept of using Google Sign-in API

# Configuration
## Google Sign-In API

**MANDATORY**

1. Create the API access
    1. Visit https://console.developers.google.com/ 
    2. Create a new project and select it(Top-left of the screen, right to the Google APIs logo there is a "Select a project", you can create one from there)
    3. On the left panel go to the "Credentials" menu
    4. Click the "Create credentials" button then select OAuth client id
    5. Application type: Web application
    6. Restrictions/Authorized redirect URIs : 	http://127.0.0.1:8080/auth/google/callback
    7. Save
2. Save the API secret in this project
    1. https://console.developers.google.com/ 
    2. Select your project
    3. Click the "Credentials" menu on the left panel
    4. Click your credential name
    5. Below the main manu header on the top (with the Google APIs logo and your Google Profile) there should be a "Download JSON" button.
    6. Save this file in /src/authentification/google/credentials.json
## Session secret
in /src/index.ts is use a secret hard-coded key to secure the session Id. This isn't mandatory to update for this P.O.C but could be an issue if used anywhere else.

# Usage

* Base URL is http://127.0.0.1:8080

## Urls
* /auth/google : Will start the login process
* /logout : Log you out
* / : Will display if you have been authentificate or not