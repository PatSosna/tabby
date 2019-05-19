#!/bin/bash


if [[ -z $(docker ps -q --filter name=node) ]]; then
    docker-compose up -d
fi

docker-compose exec node chown -R $UID:$UID /npm-cache
docker-compose exec --user $UID node $@