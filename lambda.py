import json
import boto3
from boto3.dynamodb.conditions import Attr, Key

usersCoachDB = boto3.client('dynamodb')
clientQuesDB = boto3.client('dynamodb')

def lambda_handler(event, context):
  
  userCoachData = usersCoachDB.query(
    TableName='Users',
    IndexName='UserType-index',
    KeyConditionExpression='#usertype = :value',
    ExpressionAttributeValues={
      ':value': {
        'S': 'Coach'
      }
    },
    ExpressionAttributeNames={
      '#usertype': 'usertype'
    }
  )
  
  clientQuesData = clientQuesDB.query(
    TableName='ClientQuestionnaire',
    KeyConditionExpression='#email = :value',
    ExpressionAttributeValues={
      ':value': {
        'S': 'joshualim2122@gmail.com'
      }
    },
    ExpressionAttributeNames={
      '#email': 'Email'
    }
  )
    
  obj = {
    "clientData" : clientQuesData, 
    "coachData" : userCoachData
    
  }
  
  response = {
      'statusCode': 200,
      'body': json.dumps(obj),
      'headers': {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
  }
  
  return response