import { openDB, deleteDB, wrap, unwrap, IDBPDatabase } from 'idb';

class IndexedDBWrapper {
	constructor() {}

	static storeNames = ['projects', 'schemas', 'current_project', 'user_data'];

	static db: IDBPDatabase<unknown>;

	static async createStoreInDB() {

		//If successful, return indexed db store update success, else, throw error
		try{
			IndexedDBWrapper.db = await openDB('quick-scrape', 1, {
				upgrade(db) {
					//Filter stores that haven't been created yet
					const objectStoreNames = db.objectStoreNames;

					//Filter out stores that already exist in indexed db
					const uncreatedObjectStores = IndexedDBWrapper.storeNames.filter(
						(storeName) => {
							

							if(objectStoreNames.length === 0){
								return true
							}


							for (const createdStoreName of objectStoreNames) {
								console.log(createdStoreName)
								if (createdStoreName === storeName) {
									//If store name exists, then filter out
									return false;
								}
							}
							//If store name doesn't exist, then keep in array
							return true;
						},
					);

					
					//Initiate stores
					for (let uncreatedStore of uncreatedObjectStores) {
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

			return 'IndexedDB store update success';

		}catch(e){

			console.log(typeof e)
			return "Failure to update store"
			

		}
		
	}

    static async addToStore<K extends StoreName>(storeName: K, storeItem: StoreSchema[K]){
        const transaction = IndexedDBWrapper.db.transaction(storeName, 'readwrite');

        //Carry out transaction on specific store
        await transaction.store.add(storeItem);

        //Commit transaction
        await transaction.done;
    }

	static async removeFromStore<K extends StoreName>(storeName: K, storeItem: StoreRemoveData){

		
        const transaction = IndexedDBWrapper.db.transaction(storeName, 'readwrite');
		
		switch(storeName){
			case "projects":
				//Check which data type to remove
				if(storeItem.dataType === "project"){
					transaction.store.delete(storeItem.mainId); // Simply delete the project

				}else if (storeItem.dataType === "session"){
					//Remove session from specific project. 
					//Get session >> remove session with 
					const project: ProjectDetails = await transaction.store.get(storeItem.mainId);

					//Remove session from project details
					delete project.sessionNames[storeItem.secondaryId];

					//Save updated project object to store
					await transaction.store.put(storeItem.mainId, project);
		

				}else if (storeItem.dataType === "project_schema"){
					//Remove schema from specific project. 
					//Get session >> remove session with 
					const project: ProjectDetails = await transaction.store.get(storeItem.mainId);

					//Remove schema from project details
					delete project.projectSchemas[storeItem.secondaryId];

					//Save updated project object to store
					await transaction.store.put(storeItem.mainId, project);

				}else if (storeItem.dataType === "session_schema"){

					//Remove schema from specific sessionList 
					const project: ProjectDetails = await transaction.store.get(storeItem.mainId);

					//Get session by secondary id and then schema with tertiary id
					delete project.sessionNames[storeItem.secondaryId][storeItem.tertiaryId];

					//Save updated project object to store
					await transaction.store.put(storeItem.mainId, project);


				} 
				else if (storeItem.dataType === "capture"){

					//Remove schema from specific sessionList 
					const project: ProjectDetails = await transaction.store.get(storeItem.mainId);

					//Get session by secondary id and then schema with tertiary id
					delete project.sessionNames[storeItem.secondaryId][storeItem.tertiaryId];

					//Save updated project object to store
					await transaction.store.put(storeItem.mainId, project);

				}

				break

			case "schemas":
				transaction.store.delete(storeItem.mainId);
				break
			default:
				break

		}

        //Commit transaction
        await transaction.done;
    }

	static async updateStore<K extends StoreName>(storeName: K, storeItem: StoreUpdateData){

		const transaction = IndexedDBWrapper.db.transaction(storeName, 'readwrite');

		//replace schema or project details with updated sent from session
		await transaction.store.put(storeItem.data, storeItem.mainId);

		//Commit transaction
        await transaction.done;
    
	}
}

export default IndexedDBWrapper;

