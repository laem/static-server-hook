#!/bin/bash

REPOSRC=$1
LOCALREPO=$2
BRANCH=$3

LOCALREPO_VC_DIR=$LOCALREPO/.git

if [ ! -d $LOCALREPO_VC_DIR ]
then
    git clone $REPOSRC $LOCALREPO
    cd $LOCALREPO
else
    cd $LOCALREPO
    git pull $REPOSRC $BRANCH
fi

echo 'Npm install'
npm install

echo 'Compile'
npm run compile

echo 'Parfait !'

# End
