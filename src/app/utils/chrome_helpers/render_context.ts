/* Determines where app is renderd */
const getRenderContext = async (): Promise<string> => {
	return new Promise((resolve, reject) => {
		/* Send service worker a render context request */
		chrome.runtime.sendMessage<ServiceWorkerMessage>(
			{
				action: 'get_render_context',
				payload: [],
			},
			(response: ServiceWorkerResponse['get_render_context']) => {
			
				resolve(response.renderContext);
			},
		);
	});
};

export default getRenderContext;
