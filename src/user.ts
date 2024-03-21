import { DatabaseTables, scanTableWithParams } from "./aws/config";
import { User } from "./interfaces";

export function getUser(username: string, password: string) {
    return scanTableWithParams<User[]>(DatabaseTables.users, {
        'username': {
            ComparisonOperator: 'EQ',
            AttributeValueList: [username]
        },
        'pass': {
            ComparisonOperator: 'EQ',
            AttributeValueList: [password]
        }
    });
}
