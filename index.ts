import { Handler } from "aws-lambda";
import { formatResponse } from './src/util';
import { validateJWT } from './src/auth/token-validator';
import { getUser } from './src/user';
import { insertNewTimeTracking } from './src/time-tracker'

export const handler: Handler = async (event, context) => {
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

    const { user: username } = payload!;

    const date = new Date();

    try {
        const users = await getUser(username);
        const user = users[0];
        await insertNewTimeTracking(date, user);
        return formatResponse(200, {
            message: `Time tracking succesfully inserted in ${date} for ${user.username}`
        })
    } catch (error) {
        return formatResponse(500, {
            message: "An internal error ocurred while trying to insert time tracking. check the logs for more information.",
        })
    }
};