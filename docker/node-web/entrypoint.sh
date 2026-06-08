#!/bin/sh
set -e

if [ "$1" = "node" ] && [ "$2" = "_web.js" ]; then
  node command.js migrate
fi

exec "$@"
