/* Hleper class to wrap background calls relating to DB */

class ServiceWorkerDBCalls {
	constructor() {}

	static fetchAllProjects = async (): Promise<ProjectDetails[]> => {
		try {
			const allProjects: ProjectDetails[] = await chrome.runtime.sendMessage<
				ServiceWorkerMessage<'fetch_all_projects'>
			>({
				action: 'fetch_all_projects',
				payload: null,
			});

			return allProjects;
		} catch (e) {
			console.log(typeof e);
			console.log(e);
			throw new Error('Failed to fetch projects');
		}
	};

	static addProject = async (
		projectDetails: ProjectDetails,
	): Promise<ServiceWorkerResponse['add_to_database']> => {
		try {
			const result: ServiceWorkerResponse['add_to_database'] =
				await chrome.runtime.sendMessage<
					ServiceWorkerMessage<'add_to_database'>
				>({
					action: 'add_to_database',
					payload: {
						store: 'projects',
						data: {
							addType: "project",
							data: projectDetails
						},
					},
				});

			return result;
		} catch (e) {
			console.log(typeof e);
			console.log(e);
			throw new Error('Failed to add project');
		}
	};

	static removeProject = async (
		projectId: ProjectId,
	): Promise<ServiceWorkerResponse['remove_from_database']> => {
		try {
			const result: ServiceWorkerResponse['remove_from_database'] =
				await chrome.runtime.sendMessage<
					ServiceWorkerMessage<'remove_from_database'>
				>({
					action: 'remove_from_database',
					payload: {
						store: 'projects',
						data: {
							dataType: 'project',
							mainId: projectId,
						},
					},
				});

			return result;
		} catch (e) {
			console.log(typeof e);
			console.log(e);
			throw new Error('Failed to remove project');
		}
	};

	static changeCurrentProject = async (
		projectId: ProjectId,
	): Promise<ServiceWorkerResponse['change_current_project']> => {
		try {
			const newProjectDetails: ProjectDetails =
				await chrome.runtime.sendMessage<
					ServiceWorkerMessage<'change_current_project'>
				>({
					action: 'change_current_project',
					payload: projectId,
				});

			return newProjectDetails;
		} catch (e) {
			console.log(typeof e);
			console.log(e);
			throw new Error('Failed to update current project');
		}
	};

	static changeCurrentProjectDetails = async (
		newCurrentProjectDetails: CurrentProjectDetails,
	): Promise<ServiceWorkerResponse['change_current_project_details']> => {
		try {
			const response: { success: boolean } = await chrome.runtime.sendMessage<
				ServiceWorkerMessage<'change_current_project_details'>
			>({
				action: 'change_current_project_details',
				payload: newCurrentProjectDetails,
			});

			return response;
		} catch (e) {
			console.log(typeof e);
			console.log(e);
			throw new Error('Failed to update current project details');
		}
	};

	static getCurrentProject = async (): Promise<
		ServiceWorkerResponse['get_current_project']
	> => {
		try {
			const currentProjectDetails: CurrentProjectDetails =
				await chrome.runtime.sendMessage<
					ServiceWorkerMessage<'get_current_project'>
				>({
					action: 'get_current_project',
					payload: null,
				});

			return currentProjectDetails;
		} catch (e) {
			console.log(typeof e);
			console.log(e);
			throw new Error('Failed to get current project');
		}
	};

	static removeCurrentProject = async (): Promise<
		ServiceWorkerResponse['remove_current_project']
	> => {
		try {
			const response: { success: boolean } = await chrome.runtime.sendMessage<
				ServiceWorkerMessage<'remove_current_project'>
			>({
				action: 'remove_current_project',
				payload: null,
			});

			return response;
		} catch (e) {
			console.log(typeof e);
			console.log(e);
			throw new Error('Failed to get current project');
		}
	};

	static removeCurrentSession = async (
		sessionId: SessionId,
	): Promise<ServiceWorkerResponse['remove_current_session']> => {
		try {
			const response: {
				success: boolean;
			} = await chrome.runtime.sendMessage<
				ServiceWorkerMessage<'remove_current_session'>
			>({
				action: 'remove_current_session',
				payload: sessionId,
			});

			return response;
		} catch (e) {
			console.log(typeof e);
			console.log(e);
			throw new Error('Failed to get current session');
		}
	};

	/**
	 * Session logic
	 */

	static addSession = async (
		sessionDetails: SessionDetails,
	): Promise<ServiceWorkerResponse['add_to_database']> => {
		try {
			const result: ServiceWorkerResponse['add_to_database'] =
				await chrome.runtime.sendMessage<
					ServiceWorkerMessage<'add_to_database'>
				>({
					action: 'add_to_database',
					payload: {
						store: 'projects',
						data: {
							addType: "session",
							data: sessionDetails
						},
					},
				});

			return result;
		} catch (e) {
			console.log(typeof e);
			console.log(e);
			throw new Error('Failed to add project');
		}
	};

	static removeSession = async (
		projectId: ProjectId,
		sessionId: SessionId,
	): Promise<ServiceWorkerResponse['remove_from_database']> => {
		try {
			const result: ServiceWorkerResponse['remove_from_database'] =
				await chrome.runtime.sendMessage<
					ServiceWorkerMessage<'remove_from_database'>
				>({
					action: 'remove_from_database',
					payload: {
						store: 'projects',
						data: {
							dataType: 'session',
							mainId: projectId, //Specify the project in which the session lives
							secondaryId: sessionId, //Specify the session id
						},
					},
				});

			return result;
		} catch (e) {
			console.log(typeof e);
			console.log(e);
			throw new Error('Failed to remove project');
		}
	};

	/**
	 *
	 * Schemas logic
	 */

	static fetchAllSchemas = async (): Promise<SchemaList> => {
		try {
			const allSchemas: SchemaList = await chrome.runtime.sendMessage<
				ServiceWorkerMessage<'fetch_all_schemas'>
			>({
				action: 'fetch_all_schemas',
				payload: null,
			});

			return allSchemas;
		} catch (e) {
			console.log(typeof e);
			console.log(e);
			throw new Error('Failed to fetch schemas');
		}
	};

	static addSchema = async (
		schemaDetails: SchemaDetails,
	): Promise<ServiceWorkerResponse['add_to_database']> => {
		try {
			const result: ServiceWorkerResponse['add_to_database'] =
				await chrome.runtime.sendMessage<
					ServiceWorkerMessage<'add_to_database'>
				>({
					action: 'add_to_database',
					payload: {
						store: 'schemas',
						data: schemaDetails,
					},
				});

			return result;
		} catch (e) {
			console.log(typeof e);
			console.log(e);
			throw new Error('Failed to add schema');
		}
	};

	static removeSchema = async (
		schemaId: SchemaId,
	): Promise<ServiceWorkerResponse['remove_from_database']> => {
		try {
			const result: ServiceWorkerResponse['remove_from_database'] =
				await chrome.runtime.sendMessage<
					ServiceWorkerMessage<'remove_from_database'>
				>({
					action: 'remove_from_database',
					payload: {
						store: 'schemas',
						data: {
							dataType: 'schema',
							mainId: schemaId,
						},
					},
				});

			return result;
		} catch (e) {
			console.log(typeof e);
			console.log(e);
			throw new Error('Failed to remove schema');
		}
	};
}

export default ServiceWorkerDBCalls;
