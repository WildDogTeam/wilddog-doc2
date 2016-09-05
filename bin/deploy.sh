#!/bin/sh

hexo clean
hexo generate
scp -r ./public/* root@10.8.0.101:/data/www/docs.wilddog.com/