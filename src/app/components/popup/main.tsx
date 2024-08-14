/**
 * Main container for Chrome Extension popup
 */

import React from 'react';
import * as styles from '#styles/popup.module.css';
import WelcomeScreenContainer from '#containers/popup/views/welcome_screen_container';

/**
 * TODO
 *  - Dynamic resizing of extension popup?
 * */

const MainPopupView = (/* Stateful props */{state=false}) => {

	let contentScreen: JSX.Element = <></>;

	if(state){
		contentScreen = <div>Popup content</div>;
	} else if (!state){
		contentScreen = <WelcomeScreenContainer/>
	}

	return (
		<>
			<main
				className={styles.popupContainer}
				aria-label='Popup view'
			>
				<section  className={styles.popupHeader}>
					<div className={styles.navButton}>
						{/* App button component container for navigating back */}
						<button role="button">Back</button>
					</div>
					<h1 className={styles.popupTitle}>Quick Scrape</h1>
					<div className={styles.githubButton}>
						<button>github</button>
					</div>
				</section>
				<section
					className={styles.popupContent}
					role=''
				>
					{contentScreen}
				</section>
				<section
					className={styles.popupFooter}
					role=''
				>
					<div>
						<button>Create Schema</button>
					</div>
					<div>
						<button>Scrape</button>
					</div>
					<div>
						<button>Manage Projects</button>
					</div>
				</section>
			</main>
		</>
	);
};

export default MainPopupView;
