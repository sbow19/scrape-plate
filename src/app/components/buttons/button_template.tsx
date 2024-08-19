import React from 'react';
import * as styles from '#styles/popup.module.css';

const ButtonTemplate: React.FC<ButtonTemplateProps> = ({
	children,
	onClick,
    buttonStyle
}) => {

    let style = null

    // Apply styles based on buttonStyle prop
    switch(buttonStyle){
        case "main-button":
            style = styles.popupManageScreenButton
			break
		case "main-button-inside":
			style = styles.popupManageScreenInsideButton
			break
		case "button":
			style = styles.button
    }
	return (
		<button
			onClick={(e) => {
				e.preventDefault();
				onClick();
			}}
			className={style}
		>
			{children}
		</button>
	);
};

export default ButtonTemplate;
