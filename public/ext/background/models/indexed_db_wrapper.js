import { openDB } from 'idb';
class IndexedDBWrapper {
    constructor() { }
    static storeNames = ['projects', 'schemas', 'current_project', 'user_data'];
    static db;
    async createStoreInDB() {
        IndexedDBWrapper.db = await openDB('quick-scrape', 1, {
            upgrade(db) {
                //Filter stores that haven't been created yet
                const objectStoreNames = db.objectStoreNames;
                const uncreatedObjectStores = IndexedDBWrapper.storeNames.filter((storeName) => {
                    for (const createdStoreName of objectStoreNames) {
                        if (createdStoreName === storeName) {
                            //If store name exists, then filter out
                            return false;
                        }
                    }
                    //If store name doesn't exist, then keep in array
                    return true;
                });
                //Initiate stores
                for (const uncreatedStore of uncreatedObjectStores) {
                    switch (uncreatedStore) {
                        case 'current_project':
                            //Only one key value pair exists in this object store
                            db.createObjectStore(uncreatedStore);
                            break;
                        case 'user_data':
                            break;
                        case 'projects':
                            const projectsObjectStore = db.createObjectStore(uncreatedStore, {
                                keyPath: 'id',
                            });
                            projectsObjectStore.createIndex('projectName', 'name', {
                                unique: true,
                            });
                            break;
                        case 'schemas':
                            const schemaObjectStore = db.createObjectStore(uncreatedStore, {
                                keyPath: 'id',
                            });
                            schemaObjectStore.createIndex('schemaName', 'name', {
                                unique: true,
                            });
                            break;
                        default:
                            console.log(`Unknown store: ${uncreatedStore}`);
                            break;
                    }
                }
            },
        });
    }
    async addToStore(storeName, storeItem) {
        const transaction = IndexedDBWrapper.db.transaction(storeName, 'readwrite');
        //Carry out transaction on specific store
        await transaction.store.add(storeItem);
        //Commit transaction
        await transaction.done;
    }
}
export default IndexedDBWrapper;
