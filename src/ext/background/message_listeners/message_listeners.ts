/* Registers all background listeners */

import IndexedDBWrapper from "../models/indexed_db_wrapper";

//Global extension constants accessed by extension
let renderContext: string = 'popup'; //Set render context variable

let popupRenderView: Views = 'welcome' //Set popup render view

let sidePanelRenderView: SidePanelViews = 'schema_editor'

//Get render context message
chrome.runtime.onMessage.addListener(
	(
		message: ServiceWorkerMessage<'get_render_context'>,
		sender,
		sendResponse,
	) => {
		//Check that correct action was called by frontend
		if (message.action === 'get_render_context') {

			const renderContextResponse: ServiceWorkerResponse["get_render_context"] = {
				renderContext: renderContext,
				view: renderContext === "popup" ? popupRenderView : sidePanelRenderView
			}
			
			sendResponse(renderContextResponse);

			//Reset to popup if side_panel
			renderContext = 'popup';
		}

		return true; //Indicate that listener response is async function
	},
);

chrome.runtime.onMessage.addListener(
	(message: ServiceWorkerMessage<'open_side_panel'>) => {
		if (message.action === 'open_side_panel') {

			//Set global render context
			renderContext = 'side_panel';

			//Set global side panel render renderContext
			sidePanelRenderView = message.payload.panel_view;

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

//Fetch all projects
//Async helper function
const fetchAllProjects = async()=>{

	try{
		const projectsList = await IndexedDBWrapper.fetchAllProjects();
		return projectsList

	}catch(e){

		console.log(e);
		throw new Error("")

	} 

}
chrome.runtime.onMessage.addListener(async (
	message: ServiceWorkerMessage<'fetch_all_projects'>,
    sender,
    sendResponse,
)=>{

	//Check if action is fetch all projects
	if(message.action === "fetch_all_projects"){

		let serviceWorkerResponse: ServiceWorkerResponse["fetch_all_projects"] = [];

    	fetchAllProjects().then((projectList)=>{
			serviceWorkerResponse = projectList;
			sendResponse(serviceWorkerResponse)

		}).catch((e)=>{
			console.log(typeof e);
			sendResponse(serviceWorkerResponse);
		})

        return true; //Indicate that service worker response is asynchronous
    }
})


//Async helper function
const addToDatabase = async(store: StoreName, data: StoreSchema[StoreName])=>{

	try{
		await IndexedDBWrapper.addToStore(store, data);
		return "Add to database successful"

	}catch(e){

		console.log(e);
		throw new Error("")

	} 

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
