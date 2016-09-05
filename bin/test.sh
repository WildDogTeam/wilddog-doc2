#!/bin/sh

hexo clean
hexo generate
cd ../public/
scp -r * root@10.18.2.153:/data/www/docs.wilddog.com/