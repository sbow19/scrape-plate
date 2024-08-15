import React from 'react';
import * as styles from '#styles/popup.module.css';

const AllProjectsScreen: React.FC<AllProjectsScreenProps> = ({
	projectsList,
}) => {
	return (
		<article className={styles.popupManageScreenContainer}>
			<h2 className={styles.popupWelcomeTitle}>Manage All Projects</h2>
			<div className={styles.scrollContainer}>
				<div className={styles.popupManageScreenContent}>
					<h3 className={styles.welcomeIntro}>
						Thank you for choosing Quick Scrape!
					</h3>
					<p>
						You can view online tutorials via <a href=''>this link</a> or via
						the github link above.
					</p>
					<p>
						To start scraping, you need to first create your first project and
						your first 
					</p>

					<h3 className={styles.welcomeIntro}>
						Thank you for choosing Quick Scrape!
					</h3>
					<p>
						You can view online tutorials via <a href=''>this link</a> or via
						the github link above.
					</p>
					<p>
						To start scraping, you need to first create your first project and
						your first scraping schema for your target webpage. Click the button
						below to start !
					</p>

					<h3 className={styles.welcomeIntro}>
						Thank you for choosing Quick Scrape!
					</h3>
					<p>
						You can view online tutorials via <a href=''>this link</a> or via
						the github link above.
					</p>
					<p>
						To start scraping, you need to first create your first project and
						your first scraping schema for your target webpage. Click the button
						below to start !
					</p>
				</div>
			</div>

			<button className={styles.popupManageScreenButton}>
				Create your first project
			</button>
		</article>
	);
};

export default AllProjectsScreen;
