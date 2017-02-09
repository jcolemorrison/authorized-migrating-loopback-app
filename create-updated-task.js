const fs = require('fs')

const task = require('./task-definition.json')
const updatedTask = task
const tag = 'vpcity/api'

const url = `${process.env.AWS_ACCOUNT_ID}.dkr.ecr.${process.env.AWS_DEFAULT_REGION}.amazonaws.com`

const image = `${url}/${tag}:${process.env.CIRCLE_SHA1}`

updatedTask.containerDefinitions[0].image = image

updatedTask.containerDefinitions[0].environment = [
  {
    'name': 'PRODUCTION_RDS_HOST',
    'value': process.env.PRODUCTION_RDS_HOST,
  },
  {
    'name': 'PRODUCTION_RDS_DB',
    'value': process.env.PRODUCTION_RDS_DB,
  },
  {
    'name': 'PRODUCTION_RDS_USER',
    'value': process.env.PRODUCTION_RDS_USER,
  },
  {
    'name': 'PRODUCTION_RDS_PWD',
    'value': process.env.PRODUCTION_RDS_PWD,
  },
  {
    'name': 'NODE_ENV',
    'value': 'production',
  },
]

updatedTask.containerDefinitions[0].logConfiguration.options = {
  'awslogs-group': process.env.AWSLOGS_GROUP,
  'awslogs-region': process.env.AWSLOGS_REGION,
  'awslogs-stream-prefix': process.env.AWSLOGS_STREAM_PREFIX,
}

const jsonTask = JSON.stringify(updatedTask)

fs.writeFile('updated-task.json', jsonTask, 'utf8')
