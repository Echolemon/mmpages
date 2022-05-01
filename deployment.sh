#!/bin/bash
npm install
npm run build
docker build . -t frontend
docker-compose up
docker tag backend:latest registry.digitalocean.com/mezzuzotproject/backend
docker push registry.digitalocean.com/mezzuzotproject/backend
docker tag frontend:latest registry.digitalocean.com/mezzuzotproject/frontend
docker push registry.digitalocean.com/mezzuzotproject/frontend
