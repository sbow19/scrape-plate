


export const contentContainerPrefill: ContentContainerPrefill={
    schemas: {
		currentView: 'schemas' ,
		title: "Manage Schemas",
		tableHeaders: ["Schema Name", "Target URL", "Options"],
        tableRowData: [],
		id: null
	},
    allProjects: {
		currentView:  "all_projects" ,
		title: "Manage Projects",
		tableHeaders: ["Project Name", "Last Updated", "Options"],
        tableRowData: [],
		id: null
	},
    manageProject: {
		currentView: "manage_project", 
		title: "Manage Project",
		tableHeaders: ["Session Name", "Last Updated", "Options"],
        tableRowData: [],
		id: ""
	},
    manageSession: {
		currentView: "manage_session",
		title: "Manage Session",
		tableHeaders: ["Capture Name", "Time Captured", "Options"],
        tableRowData: [],
		id: ""
	}
}