/* Hleper class to wrap background calls relating to DB */

class ServiceWorkerDBCalls {
    constructor() {};

    static fetchAllProjects = async(): Promise<ProjectDetails[]> =>{

        try{

            const allProjects: ProjectDetails[] = await chrome.runtime.sendMessage<ServiceWorkerMessage<"fetch_all_projects">>({
                action: "fetch_all_projects",
                payload: null
            });

            return allProjects;


        }catch(e){

            console.log(typeof e);
            console.log(e);
            throw new Error('Failed to fetch projects');

        }
    }

    static addProject = async(projectDetails: ProjectDetails): Promise<ServiceWorkerResponse["add_to_database"]> =>{

        try{

            const result: ServiceWorkerResponse["add_to_database"] = await chrome.runtime.sendMessage<ServiceWorkerMessage<"add_to_database">>({
                action: "add_to_database",
                payload: {
                    store: "projects",
                    data: projectDetails
                }
            });

        
            return result
        }catch(e){

            console.log(typeof e);
            console.log(e);
            throw new Error('Failed to add project');

        }

    }
    
    static removeProject = async(projectId: ProjectId): Promise<ServiceWorkerResponse["remove_from_database"]> =>{

        try{

            const result: ServiceWorkerResponse["remove_from_database"] = await chrome.runtime.sendMessage<ServiceWorkerMessage<"remove_from_database">>({
                action: "remove_from_database",
                payload: {
                    store: "projects",
                    data: {
                        dataType: "project",
                        mainId: projectId
                    }
                }
            });

            return result
        }catch(e){

            console.log(typeof e);
            console.log(e);
            throw new Error('Failed to remove project');

        }

    }

    static fetchAllSchemas = async(): Promise<SchemaList> =>{

        try{

            const allSchemas: SchemaList = await chrome.runtime.sendMessage<ServiceWorkerMessage<"fetch_all_schemas">>({
                action: "fetch_all_schemas",
                payload: null
            });

            return allSchemas;


        }catch(e){

            console.log(typeof e);
            console.log(e);
            throw new Error('Failed to fetch schemas');

        }
    }

    static addSchema = async(schemaDetails: SchemaDetails): Promise<ServiceWorkerResponse["add_to_database"]> =>{

        try{

            const result: ServiceWorkerResponse["add_to_database"] = await chrome.runtime.sendMessage<ServiceWorkerMessage<"add_to_database">>({
                action: "add_to_database",
                payload: {
                    store: "schemas",
                    data: schemaDetails
                }
            });

        
            return result
        }catch(e){

            console.log(typeof e);
            console.log(e);
            throw new Error('Failed to add schema');

        }

    }
    
    static removeSchema = async(schemaId: SchemaId): Promise<ServiceWorkerResponse["remove_from_database"]> =>{

        try{

            const result: ServiceWorkerResponse["remove_from_database"] = await chrome.runtime.sendMessage<ServiceWorkerMessage<"remove_from_database">>({
                action: "remove_from_database",
                payload: {
                    store: "schemas",
                    data: {
                        dataType: "schema",
                        mainId: schemaId
                    }
                }
            });

            return result
        }catch(e){

            console.log(typeof e);
            console.log(e);
            throw new Error('Failed to remove schema');

        }

    }

}

export default ServiceWorkerDBCalls;