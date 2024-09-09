import {
	mockProjectSchemas,
	mockSessionNames,
} from '#mocks/dummyData';

// Change tableRow data, it will get popoulated when the app is opened, not maually here

export const contentContainerPrefill: ContentContainerPrefill = {
	schemas: {
		currentView: 'schemas',
		title: 'Manage Schemas',
		tableHeaders: ['Schema Name', 'Target URL', 'Options'],
		tableRowData: mockProjectSchemas.map((schema) => {
			return { name: schema.name, id: schema.id, description: schema.url };
		}),
		id: null,
		names: null,
	},
	allProjects: {
		currentView: 'all_projects',
		title: 'Manage All Projects',
		tableHeaders: ['Project Name', 'Last Updated', 'Options'],
		tableRowData: [],
		id: null,
		names: null,
	},
	manageProject: {
		currentView: 'manage_project',
		title: 'Manage Project',
		tableHeaders: ['Session Name', 'Last Updated', 'Options'],
		tableRowData: [],
		id: '',
		names: [],
	},
	manageSession: {
		currentView: 'manage_session',
		title: 'Manage Session',
		tableHeaders: ['Capture Name', 'Time Captured', 'Options'],
		tableRowData: [],
		id: '',
		names: ['Default Project', 'Default Session'],
	},
	manageSchema: {
		currentView: 'manage_schema',
		title: 'Manage Schema',
		tableHeaders: ['Key', 'Value', 'Options'],
		tableRowData: [],
		id: '',
		names: ['Default', 'www.url.com'],
	},
};
