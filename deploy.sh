#!/usr/bin/env bash

set -e
CLUSTER="vpcity-api-cluster"
IMAGE_TAG="vpcity/api"
SERVICE="LoopbackApiService"
TASK_DEFINITION="loopback-api-task-def"

IMAGE="$AWS_ACCOUNT_ID.dkr.ecr.$AWS_DEFAULT_REGION.amazonaws.com/$IMAGE_TAG:$CIRCLE_SHA1"

function push_to_registry () {

  echo "pushing to registry"

  # Build down new version of image
  docker build --rm=false -t $IMAGE .

  # login to ECR as CircleCI
  eval $(aws ecr get-login --region $AWS_DEFAULT_REGION)

  # Push image to ECR
  docker push $IMAGE
}

function update_api_service () {

  echo "updating api service"

  # create updated task
  node ./create-updated-task.js

  # Register the new Task Definition with ECS
  aws ecs register-task-definition \
    --cli-input-json file://updated-task.json

  # Update the service, in our cluster, with the new task defintion
  aws ecs update-service --cluster $CLUSTER --service $SERVICE \
    --task-definition $TASK_DEFINITION

  # remove temp file
  rm -rf ./updated-task.json
}

# call both of the above functions
function update_ecs () {
  push_to_registry
  update_api_service
}

update_ecs
