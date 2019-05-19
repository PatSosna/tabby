#!/bin/bash


if [[ -z $(docker ps -q --filter name=node) ]]; then
    docker-compose up -d
fi


case "$1" in
    "release")
        zip -r tabby.zip \
            dist \
            icons \
            popups \
            manifest.json
    ;;

    "source")
        zip -r tabby-source.zip \
            src \
            docs \
            icons \
            docker \
            popups \
            cmd.sh \
            README.md \
            package.json \
            manifest.json \
            webpack.mix.js \
            package-lock.json \
            docker-compose.yml
    ;;


    *)
        docker-compose exec node chown -R $UID:$UID /npm-cache
        docker-compose exec --user $UID node $@
    ;;
esac
