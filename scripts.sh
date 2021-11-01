#!/bin/bash
set -e

export APP_NAME=storefront

case "$1" in
  start)
    echo 'Starting...'
    export DEBUG=storefront:*
    export NODE_ENV=dev
    export NODE_PATH=./server
    export LOGGER_LEVEL=debug
    nodemon server/bin/www $ENV
  ;;
  test)
    export DEBUG=storefront:*
    export LOGGER_LEVEL=debug
    export NODE_ENV=dev
    export NODE_PATH=./server
  ;;
  build)
    echo 'Building...'

    npm ci
    mkdir -p dist
    cp -r server dist/
    cp -r node_modules dist/
    cp server/app.js dist/
    cp package.json dist/
    cp newrelic.js dist/
  ;;
  patch)
    npm version patch -m "release: version %s"
    git push --tags
    git push
  ;;
  *)
    echo "Usage: {start|test|build|patch}"
    exit 1
  ;;
esac