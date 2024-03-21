import { config, DynamoDB } from 'aws-sdk';
import { config as dotenvConfig } from 'dotenv';
dotenvConfig();

export enum DatabaseTables {
    users = 'users',
    timeTrackingRecords = 'time-tracking-records'
}

export const configAWS = {
    tables: {
        users: DatabaseTables.users,
        timeTrackingRecords: DatabaseTables.timeTrackingRecords
    },
    aws_remote_config: {
        accessKeyId: process.env.ACCESS_KEY_ID,
        secretAccessKey: process.env.SECRET_ACCESS_KEY,
        region: 'sa-east-1',
    }
}

type DynamoFilter = {
    [key: string]: {
        ComparisonOperator: 'EQ' | 'NE' | 'IN' | 'LE' | 'LT' | 'GE' | 'GT' | 'BETWEEN' | 'NOT_NULL' | 'NULL' | 'CONTAINS' | 'NOT_CONTAINS' | 'BEGINS_WITH',
        AttributeValueList: string[]
    }
}

function connectToDynamoDB() {
    config.update(configAWS.aws_remote_config);
    return new DynamoDB.DocumentClient();
}

export async function scanTableWithParams<T>(tableName: DatabaseTables, filters: DynamoFilter): Promise<T> {
    const docClient = connectToDynamoDB();
    return new Promise((resolve, reject) => {
        docClient.scan({
            TableName: tableName,
            ScanFilter: filters
        }).promise().then(data => resolve(data.Items as T)).catch(error => reject(error));
    });
}

export async function insertNewRecord<T>(tableName: DatabaseTables, item: T): Promise<void> {
    const docClient = connectToDynamoDB();
    return new Promise((resolve, reject) => {
        docClient.put({
            TableName: tableName,
            Item: item as AWS.DynamoDB.DocumentClient.PutItemInputAttributeMap,
        }).promise().then(_ => resolve()).catch(error => reject(error));
    });
}