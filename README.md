Before starting the server, you must:

1) Install and create PostgreSQL 

2) In the src folder create .env containing data:

    FACEBOOK_ACCESS_TOKEN=<<Your token>>
    DIALOGFLOW_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----<<Your key>>-----END PRIVATE KEY-----\n"
    DIALOGFLOW_CLIENT_EMAIL=<<Your email>>
    
    DB_NAME=<<Your database name>>
    DB_USER=<<Your database user name>>
    DB_PASS=<<Your database user password>>
    
    PROJECT_ID=<<Your dialogflow project id>>
    
    WEBHOOK_VERIFY_TOKEN=<<Your verify webhook token>>
    
3) In the root folder create .log
    
4) Run npm install

5) Start the server with a command node app.js
    

