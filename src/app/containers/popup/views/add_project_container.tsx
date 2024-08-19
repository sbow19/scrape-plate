/**
 * Add project view container for Chrome Extension popup
 */

import React from 'react';
import * as styles from '#styles/popup.module.css';

import { useAppSelector } from 'app/utils/hooks';
import AddProject from '#components/popup/views/add_project';

const AddProjectContainer: React.FC = ()=>{

    // Fetch schemas
    const userSchemas = useAppSelector((state)=>state.schemas)
    return(<AddProject userSchemas={userSchemas}/>)
};

export default AddProjectContainer;