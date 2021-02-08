#!/bin/bash
# GitHub API Token
GH_API_TOKEN='Your-Github-API-Token'
# GitHub User Name
GH_USER='Your-Github-User'
# Variable to store first argument to setup-repo, the repo name. Will be used as GH repo name, too.
NEW_REPO_NAME=$1
# Store current working directory.
CURRENT_DIR=$PWD
# Project directory can be passed as second argument to setup-repo, or will default to current working directory.
PROJECT_DIR=${2:-$CURRENT_DIR}
# GitHub repos Create API call
curl -H "Authorization: token $GH_API_TOKEN" https://api.github.com/user/repos -d '{"name": "'"${NEW_REPO_NAME}"'"}'
git init $PROJECT_DIR
# Initialize Git in project directory, and add the GH repo remote.
git -C $PROJECT_DIR remote add origin git@github.com:$GH_USER/$NEW_REPO_NAME.git
mkdir -p src/server/storage/resources/$NEW_REPO_NAME
git clone https://github.com/$GH_USER/$NEW_REPO_NAME.git src/server/storage/resources/$NEW_REPO_NAME