import {ActiveRecord, Document, Field, ObjectIdField} from "ts-mongo-orm";
import {ObjectId} from "mongodb";
import * as Joi from "@hapi/joi";

@Document
class User {
    static databaseName = "test";
    static collectionName = "users";

    @ObjectIdField()
    _id: ObjectId;

    @Field(Joi.string())
    email: string;

    @Field(Joi.string())
    name: string;

    @Field(Joi.string())
    passwordHash: string;

    @Field(Joi.string())
    passwordSalt: string;

    @Field(Joi.date())
    createdAt: Date;

    constructor() {
        this._id = new ObjectId("000000000000000000000000");
        this.email = "";
        this.name = "";
        this.passwordHash = "";
        this.passwordSalt = "";
        this.createdAt = new Date();
    }
}

class UserModel extends User {
    // This will appear on the active record object but will not get saved to the database:
    get nameAndEmail() {
        return this.name + " " + this.email;
    }
}

export const UserActiveRecord = ActiveRecord.for(User, UserModel);