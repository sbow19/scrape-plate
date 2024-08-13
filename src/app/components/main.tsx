/**
 * Main container for Chrome Extension popup
 */

import React from 'react';
import * as styles from '#styles/popup.module.css';

/**
 * TODO
 *  - Dynamic resizing of extension popup?
 * */

const MainPopupView = (/* Stateful props */) => {
	return (
		<>
			{ /* Render children based on previous interactions*/ }
			<div className={styles.popupContainer}>
				<h1 className={styles.myHeader}>Hello World</h1>
			</div>
		</>
	);
};

export default MainPopupView;
