export const mockSessionNames: Array<SessionDetails> = [
    {
        name: 'Session1',
        id: 'DUMMY1',
        projectId: "DUMMY",
        projectName: "DUMMY",
        lastModified: "19 August 2019"
    },
    {
        name: 'Session2',
        id: 'DUMMY2',
        projectId: "DUMMY",
        projectName: "DUMMY",
        lastModified: "19 August 2019"
    },
    {
        name: 'Session3',
        id: 'DUMMY3',
        projectId: "DUMMY",
        projectName: "DUMMY",
        lastModified: "19 August 2019"
    }
]

export const mockProjectSchemas = [
    {
        name: 'Companies_House',
        id: 'DUMMYSCHEMA1',
        url: "https://www.Google.com",
        schema: ""
    },
    {
        name: 'ASIC',
        id: 'DUMMYSCHEMA2',
        url: "https://www.Google.com",
       schema: ""
    },
    {
        name: 'Blah blah blah',
        id: 'DUMMYSCHEMA3',
        url: "https://www.Google.com",
        schema: ""
    },
]
 
 //Mock current project details
 export const projectDetails: CurrentProjectDetails = {
  
    name: 'DUMMY',
    id: 'DUMMY',
    sessionNames: mockSessionNames,
    lastSession: {
        name: 'Session1',
        id: 'DUMMY1',
        projectId: "DUMMY",
        projectName: "DUMMY",
        lastModified: "19 August 2019"
    },
    projectSchemas: mockProjectSchemas,
    lastSchema: {
        name: 'Companies_House',
        id: 'DUMMY2',
        url: "https://www.Google.com",
        schema: ""
    },
    lastModified: 'Dummy3',
}

//Mock Projectlist
export const projectsList: Array<ProjectDetails> = [
    {
        name: 'DUMMY',
        id: 'DUMMY',
        sessionNames: mockSessionNames,
        projectSchemas: mockProjectSchemas,
        lastModified: "19 August 2019"
        
    },
    {
        name: 'PROJECT1',
        id: 'PROJECT1',
        sessionNames: mockSessionNames,
        projectSchemas: mockProjectSchemas,
        lastModified: "19 August 2019"
    },
    {
        name: 'BAD2',
        id: 'BAD2',
        sessionNames: mockSessionNames,
        projectSchemas: mockProjectSchemas,
        lastModified: "19 August 2019"
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