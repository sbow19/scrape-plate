let renderContext: string = 'popup';

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
	(message: ServiceWorkerMessage<'open_side_panel'>, sender) => {
		if (message.action === 'open_side_panel') {
			renderContext = 'side_panel';

			chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
				const tabId = tab.id;

				chrome.sidePanel.open({ tabId });
			});
		}
	},
);

export {};
