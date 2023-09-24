#!/bin/sh

set -ex
node /app/build/ace migration:run --force
node /app/build/server.js
