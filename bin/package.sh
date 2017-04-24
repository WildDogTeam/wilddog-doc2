#! /bin/bash


echo "Start to package project."

# $0 is filename
PRG="$0"
PRGDIR=`dirname "$PRG"` && PRGDIR=`cd "$PRGDIR" >/dev/null; pwd`

cd "$PRGDIR/.."
rm -rf dist
rm -rf public

npm set progress=false

yarn install 
yarn install hexo-cli -g 

hexo generate
gulp build
mv dist dist2
mkdir dist
mv dist2 dist/wilddog-doc2

