import React from 'react';
import * as styles from '#styles/popup.module.css';
import AddProjectButton from '#components/buttons/add_project_button';

const WelcomeScreen = (): JSX.Element => {
	return (
		<article className={styles.popupWelcomeScreen}>
			<h2 className={styles.popupWelcomeTitle}>Welcome to Quick Scrape!</h2>
			<div className={styles.popupWelcomeTextContainer}>

				<h3 className={styles.welcomeIntro}>Thank you for choosing Quick Scrape!</h3>
				<p>
					
					You can view online tutorials via <a href="">this link</a> or via
					the github link above.
				</p>
				<p>
					To start scraping, you need to first create your first project and 
					your first scraping schema for your target webpage. Click the button below to start !
				</p>
			</div>
			<AddProjectButton buttonStyle="button"/>
		</article>
	);
};

export default WelcomeScreen;
