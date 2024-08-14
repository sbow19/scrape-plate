import React from 'react';
import * as styles from '#styles/popup.module.css'

const MainFooter: React.FC<MainFooterProps> = ({onManageProjectsClick: handleManageProjectsClick}) => {
	
	return (
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
				<button onClick={handleManageProjectsClick}>Manage Projects</button>
			</div>
		</section>
	);
};

export default MainFooter;
