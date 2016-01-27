#!/bin/bash
set -x #echo on

REPOSRC=$1
LOCALREPO=$2
BRANCH=$3
NPMRUNTASK=$3

LOCALREPO_VC_DIR=$LOCALREPO/.git

if [ ! -d $LOCALREPO_VC_DIR ]
then
    git clone $REPOSRC $LOCALREPO
    cd $LOCALREPO
else
    cd $LOCALREPO
    git pull $REPOSRC $BRANCH
fi

npm install

npm run $NPMRUNTASK

echo 'Parfait !'

# End
