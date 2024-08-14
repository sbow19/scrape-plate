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

	/**
	 * Slice state
	 *  */
	type NavigationState =
		| { currentView: 'welcome'; viewParams: null }
		| { currentView: 'current_project'; viewParams: CurrentProjectDetails }
		| { currentView: 'schemas'; viewParams: null }
		| { currentView: 'all_projects'; viewParams: AllProjects }
		| { currentView: 'manage_project'; viewParams: ProjectDetails }
		| { currentView: 'manage_session'; viewParams: ManageSessionParams };

	type Views =
		| 'welcome'
		| 'current_project'
		| 'schemas'
		| 'all_projects'
		| 'manage_project'
		| 'manage_session';
	/* Views params */
	type ManageSessionParams = {
		noProperty: string;
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
	}

	//Manage projects Screen

	//Main Footer props
	interface MainFooterProps {
		onManageProjectsClick: ()=>void //Change view redux function
	}


}
