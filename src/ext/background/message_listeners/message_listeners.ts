/* Registers all background listeners */

import IndexedDBWrapper from "../models/indexed_db_wrapper";

let renderContext: string = 'popup'; //Set render context variable

//Get render context message
chrome.runtime.onMessage.addListener(
	(
		message: ServiceWorkerMessage<'get_render_context'>,
		sender,
		sendResponse,
	) => {
		//Check that correct action was called by frontend
		if (message.action === 'get_render_context') {
			//If side panel is active, send back 'side_panel'
			sendResponse({ renderContext: renderContext });

			//Reset to popup if side_panel
			renderContext = 'popup';
		}
	},
);

chrome.runtime.onMessage.addListener(
	(message: ServiceWorkerMessage<'open_side_panel'>) => {
		if (message.action === 'open_side_panel') {
			renderContext = 'side_panel';

			chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
				const tabId = tab.id;

				if(!tabId){
					return 
				}

				chrome.sidePanel.open({tabId: tabId});
			});
		}
	},
);

/**
 * 
 * Listen for indexeddb calls
 * 
 *  */

//Create db on startup

chrome.runtime.onInstalled.addListener(async ()=>{

	const result = await IndexedDBWrapper.createStoreInDB();

	console.log(result)

});




//Async helper function
const addToDatabase = async(store: StoreName, data: StoreSchema[StoreName])=>{

	await IndexedDBWrapper.addToStore(store, data);
	return "Add to database successful"

}

//Add data to store
chrome.runtime.onMessage.addListener((
	message: ServiceWorkerMessage<'add_to_database'>,
	sender,
	sendResponse,
)=>{
	//Check if action is add to database
	if(message.action === "add_to_database"){

		const { payload } = message;
		const { store, data } = payload; 

		const serviceWorkerResponse: ServiceWorkerResponse["add_to_database"] = {
			success: false
		}

		//Asynchronously handle database operation
		addToDatabase(store, data).then(()=>{
			serviceWorkerResponse.success = true;
			sendResponse(serviceWorkerResponse)

		}).catch((e)=>{
			console.log(typeof e);
			sendResponse(serviceWorkerResponse);
		})


		return true; // Indicate asynchronous response
		
	} 
});




//Helper function remove from database
const removeFromDatabase = async(data: ServiceWorkerPayloads["remove_from_database"])=>{

	await IndexedDBWrapper.removeFromStore(data.store, data.data);
	return "remove from database successful"

}

//Remove data from store
chrome.runtime.onMessage.addListener((
	message: ServiceWorkerMessage<'remove_from_database'>,
	sender,
	sendResponse,
)=>{
	//Check if action is add to database
	if(message.action === "remove_from_database"){

		const { payload } = message; 

		const serviceWorkerResponse: ServiceWorkerResponse["remove_from_database"] = {
			success: false
		}

		//Asynchronously handle database operation
		removeFromDatabase(payload).then(()=>{
			serviceWorkerResponse.success = true;
			sendResponse(serviceWorkerResponse)

		}).catch((e)=>{
			console.log(typeof e);
			sendResponse(serviceWorkerResponse);
		})


		return true; // Indicate asynchronous response
		
	} 
});





//Update data from store
//Helper function update database
const updateDatabase = async(data: ServiceWorkerPayloads["update_database"])=>{

	await IndexedDBWrapper.updateStore(data.store, data.data);
	return "Update database successful"

}

//Update data in store
chrome.runtime.onMessage.addListener((
	message: ServiceWorkerMessage<'update_database'>,
	sender,
	sendResponse,
)=>{
	//Check if action is update database
	if(message.action === "update_database"){

		const { payload } = message; 

		const serviceWorkerResponse: ServiceWorkerResponse["update_database"] = {
			success: false
		}

		//Asynchronously handle database operation
		updateDatabase(payload).then(()=>{
			serviceWorkerResponse.success = true;
			sendResponse(serviceWorkerResponse)

		}).catch((e)=>{
			console.log(typeof e);
			sendResponse(serviceWorkerResponse);
		})


		return true; // Indicate to sender to handle response asynchronously
		
	} 
});

export {};
