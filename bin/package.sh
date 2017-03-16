#! /bin/bash


echo "Start to package project."

# $0 is filename
PRG="$0"
PRGDIR=`dirname "$PRG"` && PRGDIR=`cd "$PRGDIR" >/dev/null; pwd`

cd "$PRGDIR/.."
rm -rf dist
rm -rf public

npm set progress=false

npm install --cache-min Infinity
npm install hexo-cli -g --cache-min Infinity

hexo generate
mv public dist

cd dist
tar -zcv  -f wilddog-doc2.tar.gz *


