#!/bin/bash

name=""
user=""

docker build -t $user/$name:latest . || exit
[ "$(docker ps | grep $name)" ] && docker kill $name
[ "$(docker ps -a | grep $name)" ] && docker rm $name

# docker run \
# 	-itd \
# 	--name $name \
# 	--restart=always \
# 	$user/$name:latest
