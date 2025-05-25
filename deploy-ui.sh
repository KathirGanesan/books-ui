#!/usr/bin/env bash
#
# deploy-ui.sh ─ build, push, and roll out the books-ui container
# Usage:
#   DOCKERHUB_USER=kathirganesan \
#   REMOTE_HOST=ubuntu@13.234.11.22 \
#   TAG=$(git rev-parse --short HEAD) \
#   ./deploy-ui.sh
#
# If you leave the env-vars unset the defaults below apply.
# -------------------------------------------------------------------

set -euo pipefail

APP_NAME="books-ui"
DOCKERHUB_USER="${DOCKERHUB_USER:-kathirganesan}"            # your Docker Hub handle
TAG="${TAG:-latest}"                                         # image tag
REMOTE_HOST="${REMOTE_HOST:-ubuntu@13.201.250.57}"      # SSH user@host (key must be pre-loaded)

echo "1. Building $APP_NAME:$TAG …"
docker build -t "$DOCKERHUB_USER/$APP_NAME:$TAG" .

echo "2.  Pushing to Docker Hub …"
docker push "$DOCKERHUB_USER/$APP_NAME:$TAG"

echo "3.  SSH → $REMOTE_HOST and deploy …"
ssh -i ~/Downloads/booksapi.pem "$REMOTE_HOST" bash -s <<EOF
  set -e
  echo "4.  Pull new image"
  docker pull "$DOCKERHUB_USER/$APP_NAME:$TAG"

  echo "5.  Stop & remove old container (if any)"
  docker stop  $APP_NAME || true
  docker rm    $APP_NAME || true

  echo "6.  Run fresh container"
  # --network host lets Nginx inside the container reach the API at http://127.0.0.1:8080
  docker run -d --name $APP_NAME --restart unless-stopped \
   -p 8081:80 \
   "$DOCKERHUB_USER/$APP_NAME:$TAG"

  echo "✅  UI deployed!"
EOF

echo "7.  Done.  Hit https://books.zenflixapp.online/ in a minute or two."
