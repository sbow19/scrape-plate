/* Determines where app is renderd */
const getRenderContext = async (): Promise<ServiceWorkerResponse["get_render_context"]> => {
	return new Promise((resolve) => {
		/* Send service worker a render context request */
		chrome.runtime.sendMessage<ServiceWorkerMessage>(
			{
				action: 'get_render_context',
				payload: [],
			},
			(response: ServiceWorkerResponse['get_render_context']) => {
			
				resolve(response);
			},
		);
	});
};

export default getRenderContext;
