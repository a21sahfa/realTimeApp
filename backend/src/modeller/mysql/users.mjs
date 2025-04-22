import { DataTypes } from "sequelize"
import crypto from 'crypto'
import MySQLConnector from "../lib/connectors/db_mysql.mjs";

// This code snippet is defining a Sequelize model named `Users` 
// that represents a table in a MySQL database. 
// Let's break down what each part of the code is doing:

const Users = MySQLConnector.define("users", {
    // This part of the code snippet is defining the `id` field for the `Users` model in Sequelize. 
    // Here's what each property is doing:
    id: {
        //The `type: DataTypes.INTEGER` in the Sequelize model definition is specifying that the `id` field in the `Users` model should be of type INTEGER. This means that the `id` field will store integer values, typically used for unique identifiers or primary keys in database tables.
        type: DataTypes.INTEGER,
        // `autoIncrement: true,` in the Sequelize model definition for the `id` field of the `Users` model specifies that the `id` field will automatically increment its value for each new record added to the table. This is commonly used for primary key fields to ensure that each record has a unique identifier that increases sequentially with each new entry.
        autoIncrement: true,
        // The `unique: true` property in the Sequelize model definition for the `id` field of the `Users` model specifies that the `id` field must have unique values across all records in the table. This means that each value in the `id` field must be unique and cannot be duplicated in any other record. It enforces the uniqueness constraint on the `id` field, ensuring that each record in the table has a distinct identifier.
        unique: true,
       //  `primaryKey: true` in the Sequelize model definition for the `id` field of the `Users` model specifies that the `id` field is the primary key for the table. This means that the `id` field uniquely identifies each record in the table and is used as the main identifier for referencing and querying data in the table. By setting `primaryKey: true`, you are indicating that the `id` field is the primary key, and Sequelize will enforce this constraint when interacting with the database table.
        primaryKey: true
    },
    namn: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    initialAutoIncrement: 190000,
    paranoid: true, // feature to enable soft delete functions
    hooks: {
       //The `beforeCreate` hook in the Sequelize model definition for the `Users` 
       // model is a function that is executed before a new record is created in the database table. 
       // In this specific case, the `beforeCreate` hook is responsible for hashing the user's password 
       // using the MD5 algorithm before the user record is inserted into the database.
        beforeCreate: (user) => {
            const hashedPassword = crypto.createHash("md5").update(user.password).digest("hex")
            user.password = hashedPassword
        },

        //The `beforeUpdate` hook in the Sequelize model definition for the `Users` model is a 
        // function that is executed before an existing record is updated in the database table. 
        // In this specific case, the `beforeUpdate` hook is
        //  responsible for hashing the user's password using the MD5 algorithm before the user
        //  record is updated in the database.
        beforeUpdate: (user) => {
            const hashedPassword = crypto.createHash("md5").update(user.password).digest("hex")
            user.password = hashedPassword
        },


        // The `beforeFind` hook in the Sequelize model definition for the `Users` model 
        // is a function that is executed before a database query is performed to find records in the `Users` table.
        beforeFind: (options) => {
            if (options.where && options.where.password) {
                options.where.password = crypto.createHash('md5').update(options.where.password).digest('hex');
            }
        }
    }
})

export default Users