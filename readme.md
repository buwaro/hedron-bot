# HedronBot

## Debugging
- **Start debugging:** `npm run debug`
- **Continue in debug mode:** `c`
- **Inspect variables:** `repl`
- **Show more surrounding lines:** `list(10)`

## Testing
- **Run tests:** `npm test`
> More info: `https://blog.risingstack.com/node-hero-node-js-unit-testing-tutorial`

## Prepare production
### Setup nodejs
#### Ubuntu
- **Update apt:** `sudo apt-get update`
- **Install nodejs:** `sudo apt-get install nodejs`
- **Install npm:** `sudo apt-get install npm`

Using pm2 to manage nodejs app processes.
More info at http://pm2.keymetrics.io/docs/usage/quick-start/
- **Install pm2:** `npm install pm2@latest -g`

- **Add bot and env variable to `~/.profile`:**
    ```
    export NODE_ENV="production"
    export BOT_TOKEN="TelegramBotToken"
    ```
    > **Note: You need to reload `~/.profile` for the changes to take effect
    > you can check if the variables are added with `printenv`

### Setup git remote
Using git to deploy our app to production.
If you need more info, you can follow the tutorial at https://gist.github.com/noelboss/3fe13927025b89757f8fb12e9066f2fa

- **Create the project folder on production:** `mkdir -p ~/app/hedron`
- **Create a bare repository on production:** `git init --bare ~/project.git`
- **create a new file:** `touch ~/hedron.git/hooks/post-receive`
- **Add the following content to the file:**
    ```
    #!/bin/bash
    TRAGET="/home/webuser/deploy-folder"
    GIT_DIR="/home/webuser/www.git"
    BRANCH="master"

    while read oldrev newrev ref
    do
        # only checking out the master (or whatever branch you would like to deploy)
        if [[ $ref = refs/heads/$BRANCH ]];
        then
            echo "Ref $ref received. Deploying ${BRANCH} branch to production..."
            git --work-tree=$TRAGET --git-dir=$GIT_DIR checkout -f

            pm2 stop hedron
            pm2 start ~/apps/hedron/index.js --name hedron
        else
            echo "Ref $ref received. Doing nothing: only the ${BRANCH} branch may be deployed on this server."
        fi
    done
    ```
- **Add the production remote to git in the project:** `git remote add production "user@example.com:hedron.git"`

## Deploy to production
- **Switch to the master branch:** `git checkout master`
> **Make sure your local master branch has the latest changes:** `git pull origin master`
- **Push changes to production:** `git push production master`

> **Note:** You can start the app manually by executing `pm2 start ~/apps/hedron/index.js --name hedron` if it isn't started automatically after the deploy
