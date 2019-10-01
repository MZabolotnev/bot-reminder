Before starting the server, you must:

1) Install and create db - PostgreSQL 

2) In the src folder create .env containing data:

    FACEBOOK_ACCESS_TOKEN=<<Your token>>
    DIALOGFLOW_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----<<Your key>>-----END PRIVATE KEY-----\n"
    DIALOGFLOW_CLIENT_EMAIL=<<Your email>>
  
    MESSAGE_URL=https://graph.facebook.com/v2.6/me/messages?access_token=
    PROFILE_URL=https://graph.facebook.com/v2.6/me/messenger_profile?access_token=

    
    DB_NAME=<<Your database name>>
    DB_USER=<<Your database user name>>
    DB_PASS=<<Your database user password>>
    
    PROJECT_ID=<<Your dialogflow project id>>
    
    WEBHOOK_VERIFY_TOKEN=<<Your verify webhook token>>
    
3) In the root folder create .log
    
4) Run npm install

5) Start the server with a command node app.js

6) You will need a ngrok to run locally

    Use command ngrok http 5000
    
7) Сopy received https link to your facebook app dev dashboard in Webhooks -> Edit Subscription

    https://developers.facebook.com/apps/<your app id>/webhooks/ 
    
    URL - your ngrok link
    marker - your WEBHOOK_VERIFY_TOKEN
    
    
  
    

