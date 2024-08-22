export const generateId = () => {
	return crypto.randomUUID();
};

export const createEmptySessions = (
	sessionList: Array<string>,
	projectId: ProjectId,
	projectName: string,
): SessionList => {
	const sessions: SessionList = {};

	for (const sessionName of sessionList) {
		const sessionId = crypto.randomUUID();

		sessions[sessionId] = {
			name: sessionName,
			id: sessionId,
			projectId: projectId,
			projectName: projectName,
			lastModified: new Date().toISOString(),
			captures: null,
			sessionSchemas: null,
		};
	}

	return sessions;
};

export const createSchemaListObject = (
	chosenSchemaList: SchemaList,
	userSchemas: SchemaList,
): SchemaList => {

	//If no schemas chosen, then just return an empty object
	if(Object.keys(chosenSchemaList).length === 0){
		return {}
	}

    const schemas: SchemaList = {};

	const chosenSchemaKeys = Object.keys(chosenSchemaList);

    for(const schemaId of chosenSchemaKeys){
        schemas[schemaId] = userSchemas[schemaId];
    };

    return schemas;
};
