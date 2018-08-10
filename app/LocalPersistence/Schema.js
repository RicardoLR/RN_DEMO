import Realm from 'realm';

export const MY_SCHEMA = "MySchema";

// Define your models and their properties
export const TodoSchema = {
    name: MY_SCHEMA,
    primaryKey: 'id',
    properties: {
        id: 'int',  
        name: { type: 'string', indexed: true },
    }
};

const databaseOptions = {
    path: 'todoListApp.realm',
    schema: [TodoListSchema, TodoSchema],
    schemaVersion: 0,
};

export default new Realm(databaseOptions);