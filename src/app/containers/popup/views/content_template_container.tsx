import React from 'react';
import { useAppSelector } from 'app/utils/hooks';
import ContentTemplate from '#components/popup/views/content_template';

const ContentTemplateContainer: React.FC = () => {

    //Use current view to get correct template
    const contentContainerContent = useAppSelector((state)=>state.contentContainer)
    

    return <ContentTemplate content={contentContainerContent}/>;

};

export default ContentTemplateContainer;