#!/bin/bash

# 用于自动部署wilddog-doc4到预发布环境
# 使用方法，执行： bash deploy-to-pre.sh git-branche
# git-branche为分支具体名称，如 stage-test
#
# gitlab ci trigger bash script
# TOKEN is for the project

### REF_NAME=`git rev-parse --abbrev-ref HEAD
TOKEN="2a9b7126412da31e817495a9c5de1d"
REF_NAME=$1
if [[ ${REF_NAME} != stage-* ]]
then
    echo "only stage branch is allowed"
    exit 2
fi

curl -X POST \
     -F token=$TOKEN \
     -F ref=$REF_NAME \
     http://gitlab.wilddog.cn/api/v3/projects/200/trigger/builds