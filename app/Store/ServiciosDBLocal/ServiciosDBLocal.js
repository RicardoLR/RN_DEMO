import { MY_SCHEMA } from 'LocalPersistence/Schema';

export const queryAll = () => new Promise((resolve, reject) => {    
    Realm.open(databaseOptions).then(realm => {        
        let all = realm.objects(MY_SCHEMA);
        resolve(all);  
    }).catch((error) => {        
        reject(error);  
    });;
});