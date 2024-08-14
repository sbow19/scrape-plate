export const mockSessionNames = [
    {
        name: 'Session1',
        id: 'DUMMY1',
    },
    {
        name: 'Session2',
        id: 'DUMMY2',
    },
    {
        name: 'Session3',
        id: 'DUMMY3',
    }
]

export const mockProjectSchemas = [
    {
        name: 'Companies_House',
        id: 'DUMMYSCHEMA1',
    },
    {
        name: 'ASIC',
        id: 'DUMMYSCHEMA2',
    },
    {
        name: 'Blah blah blah',
        id: 'DUMMYSCHEMA3',
    },
]
 
 //Mock current project details
 export const projectDetails: CurrentProjectDetails = {
  
    name: 'DUMMY',
    id: 'DUMMY',
    sessionNames: [
        {
            name: 'Session1',
            id: 'DUMMY1',
        },
        {
            name: 'Session2',
            id: 'DUMMY2',
        },
        {
            name: 'Session3',
            id: 'DUMMY3',
        }
    ],
    lastSession: {
        name: 'Session1',
        id: 'DUMMY1',
    },
    projectSchemas: mockProjectSchemas,
    lastSchema: {
        name: 'Companies_House',
        id: 'DUMMY2',
    },
    lastModified: 'Dummy3',
}

//Mock Projectlist
export const projectsList: Array<ProjectDetails> = [
    {
        name: 'DUMMY',
        id: 'DUMMY',
        sessionNames: mockSessionNames,
        projectSchemas: mockProjectSchemas
        
    },
    {
        name: 'PROJECT1',
        id: 'PROJECT1',
        sessionNames: mockSessionNames,
        projectSchemas: mockProjectSchemas
    },
    {
        name: 'BAD2',
        id: 'BAD2',
        sessionNames: mockSessionNames,
        projectSchemas: mockProjectSchemas
    },
];



//Mock current project details
export const emptyProjectDetails: CurrentProjectDetails = {
    name: null,
    id: null,
    sessionNames: mockSessionNames,
    lastSession: null,
    projectSchemas: [
        {
            name: 'Companies_House',
            id: 'DUMMYSCHEMA1',
        },
        {
            name: 'ASIC',
            id: 'DUMMYSCHEMA2',
        },
    ],
    lastSchema: null,
    lastModified: null,
};



export const mockInputChangeHandler: InputChangeHandler = (event, targetInputField)=>{

    return

}