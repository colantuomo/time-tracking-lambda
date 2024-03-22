import { randomUUID } from 'node:crypto';
import { DatabaseTables, insertNewRecord, scanTableWithParams } from "./aws/config";
import { TimeTrackingItem, User } from "./interfaces";
import { formatDate } from './util';

export async function insertNewTimeTracking(date: Date, user: User) {

    const referenceDate = formatDate(date);
    const dateWithHours = date.toISOString();

    const { hasTimeTracking, tracking } = await getTimeTrackingByDate(referenceDate, user.username);
    if (hasTimeTracking) {
        const { id, referenceDate, lastAction, trackings, username } = tracking as TimeTrackingItem;

        let newTrackings = [];
        if (lastAction === "checkin") {
            const lastRecordIndex = trackings.length - 1;
            trackings[lastRecordIndex]["checkout"] = dateWithHours;
            newTrackings = [...trackings]
        } else {
            newTrackings = [...trackings, { checkin: dateWithHours }]
        }

        return insertNewRecord<TimeTrackingItem>(
            DatabaseTables.timeTrackingRecords,
            {
                id,
                referenceDate,
                lastAction: lastAction === "checkin" ? "checkout" : "checkin",
                trackings: newTrackings,
                username,
            }
        );
    }

    return insertNewRecord<TimeTrackingItem>(DatabaseTables.timeTrackingRecords, {
        id: randomUUID(),
        referenceDate: referenceDate,
        lastAction: 'checkin',
        trackings: [{ checkin: dateWithHours }],
        username: user.username
    });

}

async function getTimeTrackingByDate(referenceDate: string, username: string) {
    const timeTrackings = await scanTableWithParams<TimeTrackingItem[]>(DatabaseTables.timeTrackingRecords, {
        'referenceDate': {
            ComparisonOperator: 'EQ',
            AttributeValueList: [referenceDate]
        },
        'username': {
            ComparisonOperator: 'EQ',
            AttributeValueList: [username]
        }
    });

    if (timeTrackings.length === 0) {
        return { hasTimeTracking: false, tracking: undefined };
    }
    return { hasTimeTracking: true, tracking: timeTrackings[0] };
}

export async function getAllTimeTrackings() {
    return scanTableWithParams<TimeTrackingItem[]>(DatabaseTables.timeTrackingRecords, {});
}
