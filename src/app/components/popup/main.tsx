/**
 * Main container for Chrome Extension popup
 */

import React from 'react';
import * as styles from '#styles/popup.module.css';
import WelcomeScreenContainer from '#containers/popup/views/welcome_screen_container';
import CurrentProjectScreenContainer from '#containers/popup/views/current_project_screen_container';
import AllProjectsScreenContainer from '#containers/popup/views/manage_projects_screen_container';

const MainPopupView: React.FC<MainProps> = ({currentView}) => {

	let ViewToRender: JSX.Element = <></>;

	switch(currentView){
		case "welcome":
			ViewToRender = <WelcomeScreenContainer />;
            break;
		case "all_projects":
			ViewToRender = <AllProjectsScreenContainer/>
			break
		case "current_project":
			ViewToRender = <CurrentProjectScreenContainer />;
            break;
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
						<button onClick={()=>window.location.href = 'https://www.google.com'}>github</button>
					</div>
				</section>
				<section
					className={styles.popupContent}
					role=''
				>
					{ViewToRender}
				</section>
			</main>
		</>
	);
};

export default MainPopupView;
