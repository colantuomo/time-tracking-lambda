import { Handler } from "aws-lambda";
import { formatResponse, validateJWT } from './src/util';

export const handler: Handler = async (event, context) => {
    const requestBody = JSON.parse(event.body);
    const { date } = requestBody;
    const authorization = event.headers.Authorization || event.headers.authorization;

    if (!authorization) {
        return formatResponse(401, {
            message: 'Unauthorized'
        });
    }

    const { isValid, payload } = await validateJWT(authorization);
    if (!isValid) {
        return formatResponse(401, {
            message: 'Unauthorized'
        });
    }

    return formatResponse(200, {
        timeTracking: {},
        referenceDate: date,
        payload,
    })
};