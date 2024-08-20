/**
 * Add project view container for Chrome Extension popup
 */

import React, { useState } from 'react';

import { useAppSelector } from 'app/utils/hooks';
import AddProject from '#components/popup/views/add_project';

const AddProjectContainer: React.FC = () => {
	//Session list state
	const [sessionList, setSessionList] = useState<Array<string>>([]);

	//Typed session name
	const [sessionName, setSessionName] = useState<string>('');

	//Session list handler
	const sessionAddHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {

        //Prevent default behaviour
        e.preventDefault();

        //If no text, don't do anything
        if(sessionName.trim() === ""){
            return
        }

        //Add session name to on screen list
		setSessionList([...sessionList, sessionName]);

        //reset input
        setSessionName("");
	};

    //Schema list state
	const [schemaList, setSchemaList] = useState<Array<string>>([]);


    //Schema current value
    const [ schemaSelection, setSchemaSelection ] = useState<string>("");

	//Session list handler
	const schemaAddHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {

        //Prevent default behaviour
        e.preventDefault();

        //If no text, don't do anything
        if(schemaSelection.trim() === ""){
            return
        }

        //Add schema name to on screen list
		setSchemaList(prevSchemaList=>{

            

            //Check if schema already in list
            if(prevSchemaList.some(schema=> schemaSelection === schema)){
                return prevSchemaList
            } else {
                return [...prevSchemaList, schemaSelection]
            }

        });
	};

    const handleSchemaSelect = (schemaName: string)=>{

        setSchemaSelection(schemaName);
    }

    //Delete items
    const handleSchemaDelete = (e: React.MouseEvent<HTMLButtonElement>, schemaName: string)=>{


        e.preventDefault();

        setSchemaList(prevSchemaList =>{

            //Filter selected item
            const newSchemaList = prevSchemaList.filter(schema=> schema !== schemaName)
            return newSchemaList

        })
    }

    const handleSessionDelete = (e: React.MouseEvent<HTMLButtonElement>, sessionName: string)=>{

        e.preventDefault();

        setSessionList(prevSessionList =>{

            //Filter selected item
            const newSessionList = prevSessionList.filter(session=> session !== sessionName)
            return newSessionList

        })
    }


	// Fetch schemas
	const userSchemas = useAppSelector((state) => state.schemas);

	return (
		<AddProject
			userSchemas={userSchemas}
			sessionList={sessionList}
			onSessionAdd={sessionAddHandler}
            sessionName={sessionName}
            onSessionNameChange={setSessionName}
            onSessionDelete={handleSessionDelete}

            schemaList={schemaList}
            onSchemaAdd={schemaAddHandler}
            onSchemaSelect={handleSchemaSelect}
            onSchemaDelete={handleSchemaDelete}
		/>
	);
};

export default AddProjectContainer;
