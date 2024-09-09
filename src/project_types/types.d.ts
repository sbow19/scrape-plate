export {};

declare global {
	interface CurrentProjectDetails extends ProjectDetails {
		name: ProjectName | null;
		id: ProjectId | null;
		lastSession: SessionDetails | null;
		lastSchema: SchemaDetails | null;
	}

	type ProjectDetails = {
		name: ProjectName;
		id: ProjectId;
		sessionNames: { [sessionId: SessionId]: SessionDetails } | null;
		projectSchemas: { [schemaId: SchemaId]: SchemaDetails } | null;
		lastModified: string | null;
	};

	type AllProjects = ProjectsList;

	type ProjectsList = { [id: ProjectId]: ProjectDetails };

	type SessionList = { [sessionId: SessionId]: SessionDetails };

	type SchemaId = string;
	type SessionId = string;

	type SessionDetails = {
		name: SessionName;
		id: SessionId;
		projectId: ProjectId;
		projectName: ProjectName;
		sessionSchemas: { [schemaId: SchemaId]: SchemaDetails } | null;
		captures: { [captureId: CaptureId]: CaptureDetails } | null;
		lastModified: string | null;
	};

	type CaptureDetails = {
		name: CaptureName;
		id: CaptureId;
		capturedContent: JSON | null;
		lastModified: string;
	};

	type CaptureList = { [captureId: CaptureId]: CaptureDetails } | null;

	type ProjectName = string;
	type ProjectId = string;

	type SessionIdObject = {
		sessionId: SessionId
		projectId: ProjectId
	}

	type SchemaDetails = {
		name: SchemaName;
		id: SchemaId;
		url: string;
		schema: Schema;
	};

	/* Handler functions */
	type InputChangeHandler = (
		event: React.ChangeEvent<HTMLInputElement>,
		targetInputField: string,
	) => void;

	type SelectHandler = (
		id: string,
		name: string,
		property: 'project' | 'session' | 'schema',
	) => void;

	/**
	 * Slice state
	 *  */

	//Navigation state
	type NavigationState =
		//Default views
		| {
				currentView: 'welcome';
				viewParams: {};
				currentStack: NavigationStackArray;
		  }
		| {
				currentView: 'current_project';
				viewParams: CurrentProjectDetails;
				currentStack: NavigationStackArray;
		  }

		//Content container views
		| {
				currentView: 'schemas';
				viewParams: ManageAllSchemasParams;
				currentStack: NavigationStackArray;
		  }
		| {
				currentView: 'all_projects';
				viewParams: ProjectsList;
				currentStack: NavigationStackArray;
		  }
		| {
				currentView: 'manage_project';
				viewParams: ProjectDetails;
				currentStack: NavigationStackArray;
		  }
		| {
				currentView: 'manage_session';
				viewParams: ManageSessionParams;
				currentStack: NavigationStackArray;
		  }
		| {
				currentView: 'manage_schema';
				viewParams: ManageSchemaParams;
				currentStack: NavigationStackArray;
		  }
		| {
				currentView: 'manage_capture';
				viewParams: {};
				currentStack: NavigationStackArray;
		  }
		| {
				currentView: 'add_project';
				viewParams: {};
				currentStack: NavigationStackArray;
		  }
		| {
			currentView: 'add_session';
			viewParams: ProjectDetails;
			currentStack: NavigationStackArray;
	  };

	type Views =
		| 'welcome'
		| 'current_project'
		| 'schemas'
		| 'all_projects'
		| 'manage_project'
		| 'manage_session'
		| 'manage_capture'
		| 'add_project'
		| 'manage_schema'
		| 'add_schema'
		| "add_session"

	/* Views params */
	interface ManageSessionParams extends ProjectDetails {
		sessionId: SessionId | null;
	};

	type ManageSchemaParams = {
		schemaId: SchemaId | null;
	};

	type ManageAllSchemasParams = {
		schemaList: SchemaList;
	};

	type NavigationStackArray = Array<NavigationState>;

	//content container state
	/* Several container views follow a predefined template when a desired page is navigated into, we populate the template with the values below. Not all view follow this template. The template is in the Current Content Container Components  */
	type ContentContainerPrefillItem =
		| {
				currentView: 'schemas';
				title: 'Manage Schemas';
				tableHeaders: ['Schema Name', 'Target URL', 'Options'];
				tableRowData: Array<SchemaDetails>;
				id: null;
				names: null;
		  }
		| {
				currentView: 'all_projects';
				title: 'Manage All Projects';
				tableHeaders: ['Project Name', 'Last Updated', 'Options'];
				tableRowData: Array<ProjectDetails>;
				id: null;
				names: null;
		  }
		| {
				currentView: 'manage_project';
				title: 'Manage Project';
				tableHeaders: ['Session Name', 'Last Updated', 'Options'];
				tableRowData: Array<SessionDetails>;
				id: ProjectId;
				names: ProjectName | null;
		  }
		| {
				currentView: 'manage_session';
				title: 'Manage Session';
				tableHeaders: ['Capture Name', 'Time Captured', 'Options'];
				tableRowData: Array<>;
				id: SessionId;
				names: [ProjectName, SessionName] | null;
		  }
		| {
				currentView: 'manage_schema';
				title: 'Manage Schema';
				tableHeaders: ['Key', 'Value', 'Options'];
				tableRowData: Array<>;
				id: SessionId;
				names: [SchemaName, url] | null; //Schema name and associated url
		  };

	type ContentContainerPrefill = {
		schemas: ContentContainerPrefillItem;
		allProjects: ContentContainerPrefillItem;
		manageProject: ContentContainerPrefillItem;
		manageSession: ContentContainerPrefillItem;
		manageSchema: ContentContainerPrefillItem;
	};

	//User schemas state

	type SchemaList = { [schemaId: SchemaId]: SchemaDetails };

	/*
		Component Props
	*

	//Main component
	type MainProps = {
		currentView: Views;
	};

	//Current project screen
	/** Props */
	interface CurrentProjectScreenProps {
		currentProject: CurrentProjectDetails;
		projectList: ProjectsList;
		inputText: {
			projectText: string;
			sessionText: string;
			schemaText: string;
		};
		onChange: InputChangeHandler;
	}

	//Manage projects Screen

	//Main Footer props
	interface MainFooterProps {
		onManageProjectsClick: () => void; //Change view redux function
	}

	//Content Container props
	interface ContentContainerProps {
		content: ContentContainerPrefillItem;
	}

	//Create project button props
	interface CreateProjectButtonProps {
		onClick: () => void;
		buttonStyle: 'main-button';
	}

	//Button Template Props
	interface ButtonTemplateProps {
		children: JSX.Elements;
		onClick: () => void;
	}

	//View Details button
	interface ViewDetailsButton {
		children: React.Node;
		id: ProjectId | SessionId | SchemaId | null;
		targetView: Views;
	}

	//Add Project View props
	interface AddProjectViewProps {
		userSchemas: SchemaList;
		sessionList: Array<string>;
		onProjectNameChange: (string: string) => void;
		onSessionAdd: (
			event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
		) => void;
		sessionName: string;
		onSessionNameChange: React.Dispatch<React.SetStateAction<string>>;
		onSessionDelete: (
			event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
			sessionName: SessionName,
		) => void;

		schemaList: SchemaLists;
		onSchemaAdd: (
			event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
		) => void;
		onSchemaSelect: ChangeEventHandler<HTMLSelectElement>;
		onSchemaDelete: (
			event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
			schemaName: SchemaName,
		) => void;

		onAddProject: () => void;
	}

	//Add Project View props
	interface AddSessionViewProps {
		userSchemas: SchemaList;
		sessionName: string;
		projectName: string;
		onSessionNameChange: (sessionName: string) => void;

		schemaList: SchemaLists;
		onSchemaAdd: (
			event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
		) => void;
		onSchemaSelect: ChangeEventHandler<HTMLSelectElement>;
		onSchemaDelete: (
			event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
			schemaName: SchemaName,
		) => void;

		onAddSession: () => void;
	}

	interface MainProps {
		currentView: Views;
		navigationStack: NavigationStackArray;
		onBack: () => void;
	}

	interface MainContainerProps {}

	interface SidePanelProps {
		currentView: 'schema_capture' | 'schema_editor';
	}

	interface SidePanelContainerProps {}

	interface AppProps {
		renderContext: ServiceWorkerResponse['get_render_context'];
	}

	/* Chrome messages templates */

	type ServiceWorkerMessage<
		K extends ServiceWorkerAction = ServiceWorkerAction,
	> = {
		action: K;
		payload: ServiceWorkerPayloads[K];
	};

	type ServiceWorkerPayloads = {
		get_render_context: []; // Payload for `get_render_context`
		// Add other actions and their payload types here
		open_side_panel: {
			panel_view: SidePanelViews;
		};
		add_to_database: StoreAddItem;
		remove_from_database: {
			store: StoreName; //Select store to remove  data from
			data: StoreRemoveData;
		};
		update_database: {
			store: StoreName;
			data: StoreUpdateData;
		};
		fetch_all_projects: null;
		fetch_all_schemas: null;
		change_current_project: ProjectId;
		get_current_project: null;
		remove_current_project: null;
		remove_current_session: SessionId;
		change_current_project_details: CurrentProjectDetails
	};

	type StoreRemoveData = {
		dataType:
			| 'project'
			| 'session'
			| 'project_schema'
			| 'session_schema'
			| 'schema'
			| 'capture'; //Select the actual data to remove from store
		mainId: ProjectId | SchemaId; //Store item id
		secondaryId?: SessionId | SchemaId; //If we are removing a specific session or schema from a project, then we need to provide the project id > session or schema id
		tertiaryId?: CaptureId | SchemaId; //If we are removing a specific capture or schema from a session, then we need to provide te projectId > session id > capture/schema id
	};

	type StoreUpdateData = {
		data: ProjectDetails | SchemaDetails;
		mainId: ProjectId | SchemaId; //Store item id
	};

	type ServiceWorkerAction = keyof ServiceWorkerResponse;

	interface ServiceWorkerResponse {
		get_render_context:
			| { renderContext: 'popup'; view: 'welcome' | 'current_project' }
			| {
					renderContext: 'side_panel';
					view: 'schema_editor' | 'schema_capture';
			  };
		open_side_panel: null;
		add_to_database: {
			success: boolean;
			data?: ProjectDetails
		};
		remove_from_database: {
			success: boolean;
			data?: ProjectDetails 
		};
		update_database: {
			success: boolean;
		};
		fetch_all_projects: ProjectDetails[] | [];
		fetch_all_schemas: SchemaList;
		change_current_project: ProjectDetails;
		get_current_project: CurrentProjectDetails | null;
		remove_current_project: {
			success: boolean
		}
		remove_current_session: {
			success: boolean;
		}
		change_current_project_details: {
			success: boolean
		}
	}

	type ServiceWorkerResponseBase = {
		error?: Error;
	};

	/* Indexed DB */

	type StoreName = 'projects' | 'schemas' | 'current_project' | 'user_data';

	type StoreName = keyof StoreSchema;

	type StoreSchema = {
		projects: {
			addType: "project" | "session" | "schema"
			data: ProjectDetails | SessionDetails
		};
		schemas: SchemaDetails;
		current_project: CurrentProjectDetails;
		user_data: {};
	};

	type StoreAddItem<K extends StoreName = StoreName> = {
		store: K;
		data: StoreSchema[K];
	};

	/* Chrome helpers */
	type SidePanelViews = 'schema_capture' | 'schema_editor';

	/* Thunks async promist state */
	interface ProjectListFetch extends PromiseState {
		projectList: ProjectsList;
	}

	type PromiseState = {
		isLoading: boolean;
		isError: boolean;
	};
}
