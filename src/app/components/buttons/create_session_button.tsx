import React from 'react';
import ButtonTemplate from './button_template';
// import { useAppDispatch } from 'app/utils/hooks';
// import { changeView } from '#ducks/features/navigation/navigationSlice';

const CreateSessionButton: React.FC<CreateProjectButtonProps> = ({buttonStyle, onClick})=>{

    // const dispatch = useAppDispatch()

    return(
        <ButtonTemplate buttonStyle={buttonStyle} onClick={onClick}>Add Session</ButtonTemplate>
    )
}

export default CreateSessionButton;