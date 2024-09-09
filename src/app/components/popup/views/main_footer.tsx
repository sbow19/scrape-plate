import React from 'react';
import * as styles from '#styles/popup.module.css'

import openSidePanel from 'app/utils/chrome_helpers/open_side_panel';

const MainFooter: React.FC<MainFooterProps> = ({onManageProjectsClick: handleManageProjectsClick}) => {
	
	return (
		<section
			className={styles.popupFooter}
			role=''
		>
			<div>
				<button onClick={()=>openSidePanel("schema_creator")}>Create Schema</button>
			</div>
			<div>
				<button onClick={()=>openSidePanel("schema_capture")}>Scrape</button>
			</div>
			<div>
				<button onClick={handleManageProjectsClick}>Manage Projects</button>
			</div>
		</section>
	);
};

export default MainFooter;
