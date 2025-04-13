#!/usr/bin/env bash

set -ex

#
# This script tears down and re-ups the local docker compose stack.
#
# When to use?
# Useful when a fresh start is needed eg. after switching branches when deps changed to ensure a clean slate.
#
# It removes:
#  - local deps of npm
#  - local images
# After removal, it starts the stack again.
# Packages are installed, the db is seeded and afterwards all containers are started.

# Take down current stack
docker compose rm -f -s -v

# Remove existing images
docker compose build

# clear node modules
rm -rf artifact/{frontend}/node_modules

# launch 
docker compose up -d
