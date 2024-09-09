import { openDB, IDBPDatabase } from 'idb';

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
					for (const uncreatedStore of uncreatedObjectStores) {
						switch (uncreatedStore) {
							case 'current_project':
								//Only one key value pair exists in this object store
								db.createObjectStore(uncreatedStore, {autoIncrement: true});
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

		//Reopen db if Service Worker closed
		if(!IndexedDBWrapper.db){
			await IndexedDBWrapper.createStoreInDB()
		}

        const transaction = IndexedDBWrapper.db.transaction(storeName, 'readwrite');

		console.log(storeItem)

		//Determine add logic based on add type
		switch(storeItem.addType){
			case "project":
				//Add project to projects store
				await transaction.store.add(storeItem.data);
				break
			case "session":

				//Fetch project to add session to
				const newSessionData: SessionDetails = storeItem.data; //Where data is SessionDetails

				const targetProject = await transaction.store.get(newSessionData.projectId);

				//Add new session to target project
				targetProject.sessionNames[newSessionData.id] = newSessionData;

				await transaction.store.put(targetProject); //Automatically update project list store

				return targetProject
			default: 
				break
		}

       

        //Commit transaction
        await transaction.done;
    }

	static async removeFromStore<K extends StoreName>(storeName: K, storeItem: StoreRemoveData){

		//Reopen db if Service Worker closed
		if(!IndexedDBWrapper.db){
			await IndexedDBWrapper.createStoreInDB()
		}
		
        const transaction = IndexedDBWrapper.db.transaction(storeName, 'readwrite');
		
		switch(storeName){
			case "projects":
				//Check which data type to remove
				if(storeItem.dataType === "project"){
					transaction.store.delete(storeItem.mainId); // Simply delete the project

				}else if (storeItem.dataType === "session"){
					//Remove session from specific project. 
					//Get session >> remove session with 
					const projects: ProjectDetails[] = await transaction.store.getAll();

					//Return matching project
					const targetProject = projects.find((project)=> project.id === storeItem.mainId);

					//Remove session from project details
					delete targetProject.sessionNames[storeItem.secondaryId];

					//Replace updated project object to store
					
					try{

						await transaction.store.put(targetProject);

					}catch(e){
						console.log(e)
					}

					await transaction.done;

					return targetProject
		

				}else if (storeItem.dataType === "project_schema"){
					//Remove schema from specific project. 
					//Get session >> remove session with 
					const project: ProjectDetails = await transaction.store.get(storeItem.mainId);

					//Remove schema from project details
					delete project.projectSchemas[storeItem.secondaryId];

					//Replace updated project object to store
					await transaction.store.put(project, storeItem.mainId);

					await transaction.done

				}else if (storeItem.dataType === "session_schema"){

					//Remove schema from specific sessionList 
					const project: ProjectDetails = await transaction.store.get(storeItem.mainId);

					//Get session by secondary id and then schema with tertiary id
					delete project.sessionNames[storeItem.secondaryId][storeItem.tertiaryId];

					//Save updated project object to store
					await transaction.store.put(project, storeItem.mainId);

					await transaction.done


				} 
				else if (storeItem.dataType === "capture"){

					//Remove schema from specific sessionList 
					const project: ProjectDetails = await transaction.store.get(storeItem.mainId);

					//Get session by secondary id and then schema with tertiary id
					delete project.sessionNames[storeItem.secondaryId][storeItem.tertiaryId];

					//Save updated project object to store
					await transaction.store.put(project, storeItem.mainId);

					await transaction.done

				}

				break

			case "schemas":
				transaction.store.delete(storeItem.mainId);

				await transaction.done
				break
			default:
				break

		}

        //Commit transaction
        await transaction.done;
    }

	static async updateStore<K extends StoreName>(storeName: K, storeItem: StoreUpdateData){

		//Reopen db if Service Worker closed
		if(!IndexedDBWrapper.db){
			await IndexedDBWrapper.createStoreInDB()
		}
		
		const transaction = IndexedDBWrapper.db.transaction(storeName, 'readwrite');

		//replace schema or project details with updated sent from session
		await transaction.store.put(storeItem.data, storeItem.mainId);

		//Commit transaction
        await transaction.done;
    
	}

	static async fetchAllProjects(){
		//Reopen db if Service Worker closed
		if(!IndexedDBWrapper.db){
			await IndexedDBWrapper.createStoreInDB()
		};

		const transaction = IndexedDBWrapper.db.transaction("projects", 'readwrite');

		//Get all projects from store
        const projects: ProjectDetails[] = await transaction.store.getAll();

		await transaction.done

		return projects
	}

	static async changeCurrentProject(projectId: ProjectId){
		//Reopen db if Service Worker closed
		if(!IndexedDBWrapper.db){
			await IndexedDBWrapper.createStoreInDB()
		};

	

		//Fetch project details from store
		const transactionOne = IndexedDBWrapper.db.transaction("projects", "readonly");

		let projectDetails: ProjectDetails = null;

		try{

			projectDetails = await transactionOne.store.get(projectId);

		}catch(e){

			throw new Error("Could not fetch project details")

		}

		await transactionOne.done
		

		const transactionTwo = IndexedDBWrapper.db.transaction("current_project", 'readwrite');

		//Set current project
		const currentProjectDetails:CurrentProjectDetails = {
			...projectDetails,
			lastSchema: null,
			lastSession: null,
			lastModified: null
		} 

		//Remove current project
		await transactionTwo.store.clear();

        await transactionTwo.store.put(currentProjectDetails);

		await transactionTwo.done

		//REturn project details to client
		return projectDetails

	}

	static async changeCurrentProjectDetails(newCurrentProjectDetails: CurrentProjectDetails){
		//Reopen db if Service Worker closed
		if(!IndexedDBWrapper.db){
			await IndexedDBWrapper.createStoreInDB()
		};		

		const transaction = IndexedDBWrapper.db.transaction("current_project", 'readwrite');

		//Remove current project
		await transaction.store.clear();

        await transaction.store.put(newCurrentProjectDetails);

		await transaction.done

	}


	static async getCurrentProject(){

		//Reopen db if Service Worker closed
		if(!IndexedDBWrapper.db){
			await IndexedDBWrapper.createStoreInDB()
		};

		const transaction = IndexedDBWrapper.db.transaction("current_project", 'readonly');

		let currentProjectDetails: CurrentProjectDetails = null;

		try{

			[currentProjectDetails] = await transaction.store.getAll();

		}catch(e){

			throw new Error("Could not fetch project details")

		}

		await transaction.done;

		return currentProjectDetails

	}

	static async removeCurrentProject(){

		//Reopen db if Service Worker closed
		if(!IndexedDBWrapper.db){
			await IndexedDBWrapper.createStoreInDB()
		};

		const transaction = IndexedDBWrapper.db.transaction("current_project", 'readwrite');

		try{

			await transaction.store.clear();

		}catch(e){

			throw new Error("Could not fetch project details")

		} finally {
			await transaction.done;
		}


	}

	static async removeCurrentSession(sessionId: SessionId){

		//Reopen db if Service Worker closed
		if(!IndexedDBWrapper.db){
			await IndexedDBWrapper.createStoreInDB()
		};

		const transaction = IndexedDBWrapper.db.transaction("current_project", 'readwrite');

		try{
			//Fetch project
			const [currentProject] = await transaction.store.getAll();

			//Remove session from current project
			delete currentProject.sessionNames[sessionId];
			
			await transaction.done

		}catch(e){

			throw new Error("Could not remove current session")

		} finally {
			await transaction.done;
		}


	}
}

export default IndexedDBWrapper;

