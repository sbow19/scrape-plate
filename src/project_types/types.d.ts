
export {};

declare global {
	interface CurrentProjectDetails extends ProjectDetails {
		name: ProjectName | null;
		id: ProjectId | null;
		lastSession: SessionDetails | null;
		lastSchema: SchemaDetails | null;
		lastModified: string | null;
	}

	type ProjectDetails = {
		name: ProjectName;
		id: ProjectId;
		sessionNames: Array<SessionDetails> | null;
		projectSchemas: Array<SchemaDetails> | null;
	};

	type AllProjects = {
		projectsList: Array<ProjectDetails>;
	};

	type SchemaId = string;
	type SessionId = string;

	type SessionDetails = {
		name: SessionName;
		id: SessionId;
	};

	type ProjectName = string;
	type ProjectId = string;

	type SchemaDetails = {
		name: SchemaName;
		id: SchemaId;
	};

	/* Handler functions */
	type InputChangeHandler = (
		event: React.ChangeEvent<HTMLInputElement>,
		targetInputField: string,
	) => void;

	type SelectHandler = (
		id: string,
		name: string,
		property: "project" | "session" | "schema"
	) => void;

	/**
	 * Slice state
	 *  */

	//Navigation state
	type NavigationState =
		| { currentView: 'welcome'; viewParams: null }
		| { currentView: 'current_project'; viewParams: CurrentProjectDetails }
		| { currentView: 'schemas'; viewParams: null }
		| { currentView: 'all_projects'; viewParams: AllProjects }
		| { currentView: 'manage_project'; viewParams: ProjectDetails }
		| { currentView: 'manage_session'; viewParams: ManageSessionParams }
		| { currentView: 'manage_schema'; viewParams: ManageSchemaParams }
		| { currentView: 'add_project'; viewParams: null };

	type Views =
		| 'welcome'
		| 'current_project'
		| 'schemas'
		| 'all_projects'
		| 'manage_project'
		| 'manage_session'
		| "add_project"
		| "manage_schema"

	/* Views params */
	type ManageSessionParams = {
		sessionId: SessionId | null
	};

	type ManageSchemaParams = {
		schemaId: SchemaId | null
	}

	//content containet state
	type ContentContainerPrefillItem =
		| {
				currentView: 'schemas';
				title: "Manage Schemas"
				tableHeaders: ['Schema Name', 'Target URL', 'Options'];
				tableRowData: Array<SchemaDetails>;
				id: null
		  }
		| {
				currentView: 'all_projects';
				title: "Manage Projects"
				tableHeaders: ['Project Name', 'Last Updated', 'Options'];
				tableRowData: Array<ProjectDetails>;
				id: null
		  }
		| {
				currentView: 'manage_project';
				title: "Manage Project"
				tableHeaders: ['Session Name', 'Last Updated', 'Options'];
				tableRowData: Array<SessionDetails>;
				id: ProjectId
		  }
		| {
				currentView: 'manage_session';
				title: "Manage Session"
				tableHeaders: ['Capture Name', 'Time Captured', 'Options'];
				tableRowData: Array<>;
				id: SessionId
		  }

	type ContentContainerPrefill = {
		schemas: ContentContainerPrefillItem;
		allProjects: ContentContainerPrefillItem;
		manageProject: ContentContainerPrefillItem;
		manageSession: ContentContainerPrefillItem;
	};

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
		projectList: Array<ProjectDetails>;
		inputText: {
			projectText: string;
			sessionText: string;
			schemaText: string;
		};
		onChange: InputChangeHandler;
		onSelect: SelectHandler
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

	//Button Template Props 
	interface ButtonTemplateProps {
		children: JSX.Elements
		onClick: () => void;
	}

	//View Details button 
	interface ViewDetailsButton {
		children: React.Node
		id: ProjectId | SessionId | SchemaId | null
		targetView: Views
	}
	
}
