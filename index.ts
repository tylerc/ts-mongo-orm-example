import {DatabaseConnectDefault, DatabaseConnectionsClose} from "ts-mongo-orm";
import {UserActiveRecord} from "./user";
import {ObjectId} from "mongodb";

(async () => {
    await DatabaseConnectDefault("mongodb://localhost:27017/test");

    const now = new Date();
    const email = `someone+${now.getTime()}@example.com`;

    // This is a type-safe document builder you can use to build up a document piece by piece:
    let newUserDoc = UserActiveRecord
        .builder()
        .prop('_id', new ObjectId())
        .props({
            email,
            name: "Someone Else " + now.toISOString(),
            passwordHash: "1234567890",
            passwordSalt: "0987654321",
            createdAt: new Date()
        })
        .build()
    ;

    let userActiveRecord = UserActiveRecord.create(newUserDoc);
    await userActiveRecord.save();
    console.log("Saved user to the database (" + userActiveRecord.nameAndEmail + ")");

    await userFindAndLog(email);
    await userDeleteIfFound(email);

    console.log("Finding all users that exist in the DB...");
    let allUsers = await UserActiveRecord.findAll();
    if (allUsers.length === 0) {
        console.log("There are no users in the DB.");
    } else {
        allUsers.forEach(u => console.log("Found:", u.toJSON()));
    }

    console.log("Program complete, cleaning up DB connections and exiting.");
    await DatabaseConnectionsClose();
})();

async function userFindAndLog(email: string) {
    // This query is fully type-checked:
    let user = await UserActiveRecord.findOne({email});

    if (user) {
        console.log("Found user in database:");
        console.log(user.nameAndEmail);
    } else {
        console.error("User not found!");
    }
}

async function userDeleteIfFound(email: string) {
    // This query is fully type-checked:
    let user = await UserActiveRecord.findOne({email});

    if (user) {
        console.log("Deleting " + user._id + "...");
        // Since user is an ActiveRecord instance, we can simply call delete()
        // on it to remove it from the DB:
        await user.delete();
    } else {
        console.error("No user found to delete!");
    }
}