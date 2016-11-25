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
else
    cd $LOCALREPO
    git pull $REPOSRC $BRANCH
fi

# No need to build, dist files are already commited

# . ~/.nvm/nvm.sh > /dev/null
# nvm use 5

# npm install

# npm run $NPMRUNTASK


echo 'Parfait !'

# End
