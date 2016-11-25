#!/bin/bash

REPOSRC=$1
LOCALREPO=$2
BRANCH=$3
NPMRUNTASK=$4

LOCALREPO_VC_DIR=$LOCALREPO/.git

if [ ! -d $LOCALREPO_VC_DIR ]
then
    git clone $REPOSRC $LOCALREPO
    cd $LOCALREPO
    git checkout $BRANCH
else
    cd $LOCALREPO
    git checkout $BRANCH
    git pull $REPOSRC $BRANCH
fi

# No need to build, dist files are already commited

. ~/.nvm/nvm.sh > /dev/null
nvm use 6.9.1

npm install
npm install -g webpack

npm run $NPMRUNTASK


echo 'Parfait !'

# End
