#!/bin/bash
set -e # Exit with nonzero exit code if anything fails

SOURCE_BRANCH="master"
BUILD_FOLDER="build"

REPO="https://github.com/wcpr740/wcpr740.github.io"
# using REPO=`git config remote.origin.url` will commit to the current repo
TARGET_BRANCH="master"

function doCompile {
  python freeze.py freeze_dev
}

# Pull requests and commits to other branches shouldn't try to deploy, just build to verify
if [ "$TRAVIS_PULL_REQUEST" != "false" -o "$TRAVIS_BRANCH" != "$SOURCE_BRANCH" ]; then
    echo "Skipping deploy; just doing a build."
    doCompile
    exit 0
fi

# Save some useful information
SSH_REPO=${REPO/https:\/\/github.com\//git@github.com:}
SHA=`git rev-parse --verify HEAD`

# Clone the existing $TARGET_BRANCH for this repo into $BUILD_FOLDER/
# Create a new empty branch if $TARGET_BRANCH doesn't exist yet (should only happen on first deply)
git clone $REPO $BUILD_FOLDER
cd $BUILD_FOLDER
git checkout $TARGET_BRANCH || git checkout --orphan $TARGET_BRANCH
cd ..

# Clean out existing contents
rm -rf $BUILD_FOLDER/**/* || exit 0

# Run our compile script
doCompile

# Now let's go have some fun with the cloned repo
cd $BUILD_FOLDER
git config user.name "Travis CI"
git config user.email "$COMMIT_AUTHOR_EMAIL"

# If there are no changes to the compiled out (e.g. this is a README update) then just bail.
if [ -z `git diff --exit-code` ]; then
    echo "No changes to the output on this push; exiting."
    exit 0
fi

# Commit the "changes", i.e. the new version.
# The delta will show diffs between new and old versions.
git add .
git commit -m "Deploy to GitHub Pages: ${SHA}"

# Get the deploy key by using Travis's stored variables to decrypt deploy_key.enc
ENCRYPTED_KEY_VAR="encrypted_${ENCRYPTION_LABEL}_key"
ENCRYPTED_IV_VAR="encrypted_${ENCRYPTION_LABEL}_iv"
ENCRYPTED_KEY=${!ENCRYPTED_KEY_VAR}
ENCRYPTED_IV=${!ENCRYPTED_IV_VAR}
openssl aes-256-cbc -K $ENCRYPTED_KEY -iv $ENCRYPTED_IV -in deploy_key.enc -out deploy_key -d
chmod 600 deploy_key
eval `ssh-agent -s`
ssh-add deploy_key

# Now that we're all set up, we can push.
git push $SSH_REPO $TARGET_BRANCH