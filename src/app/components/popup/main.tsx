/**
 * Main container for Chrome Extension popup
 */

import React from 'react';
import * as styles from '#styles/popup.module.css';
import WelcomeScreenContainer from '#containers/popup/views/welcome_screen_container';
import CurrentProjectScreenContainer from '#containers/popup/views/current_project_screen_container';
import ContentTemplateContainer from '#containers/popup/views/content_template_container';
import AddProjectContainer from '#containers/popup/views/add_project_container';
import AddSessionContainer from '#containers/popup/views/add_session_container';

import { ToastContainer } from 'react-toastify';

const MainPopupView: React.FC<MainProps> = ({
	currentView,
	navigationStack,
	onBack: handleBack,
}) => {
	let ViewToRender: JSX.Element = <></>;

	//Re render when navigation stack changes, as in some instances refreshes do not occurs

	switch (currentView) {
		case 'welcome':
			ViewToRender = <WelcomeScreenContainer />;
			break;
		case 'all_projects':
			ViewToRender = <ContentTemplateContainer />;
			break;
		case 'current_project':
			ViewToRender = <CurrentProjectScreenContainer />;
			break;
		case 'manage_project':
			ViewToRender = <ContentTemplateContainer />;
			break;
		case 'add_project':
			ViewToRender = <AddProjectContainer />;
			break;
		case 'manage_session':
			ViewToRender = <ContentTemplateContainer />;
			break;
		case 'add_session':
			ViewToRender = <AddSessionContainer />;
			break;
		case 'schemas':
			ViewToRender = <ContentTemplateContainer />;
			break;
		case 'manage_schema':
			ViewToRender = <ContentTemplateContainer />;
			break;
		case 'manage_capture':
			ViewToRender = <ContentTemplateContainer />;
			break;
		default:
			ViewToRender = <p>Error, go back</p>;
	}
	return (
		<>
			<ToastContainer />
			<main
				className={styles.popupContainer}
				aria-label='Popup view'
			>
				<section className={styles.popupHeader}>
					<div className={styles.navButton}>
						{/* App button component container for navigating back */}
						{navigationStack.length > 1 ? (
							<button
								onClick={handleBack}
								role='button'
							>
								Back
							</button>
						) : null}
					</div>
					<h1 className={styles.popupTitle}>Quick Scrape</h1>
					<div className={styles.githubButton}>
						<button
							onClick={() => (window.location.href = 'https://www.google.com')}
						>
							github
						</button>
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
