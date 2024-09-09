import React from 'react';
import * as styles from '#styles/popup.module.css';

/* Button components imports */
import AddProjectButton from '#components/buttons/add_project_button';
import EditSchemaButton from '#components/buttons/edit_schema_button';
import DeleteSchemaButton from '#components/buttons/delete_schema_button';
import ExportButton from '#components/buttons/export_button';
import SetCurrentProjectButton from '#components/buttons/set_current_project_button';
import ViewDetailsButton from '#components/buttons/view_details_button';
import DeleteProjectButton from '#components/buttons/delete_project_button';
import DeleteSessionButton from '#components/buttons/delete_session_button';
import AddSessionButton from '#components/buttons/add_session_button';
import { useAppSelector } from 'app/utils/hooks';

const ContentTemplate: React.FC<ContentContainerProps> = ({ content }) => {
	const { currentView, title, tableHeaders, tableRowData, id, names } = content;

	//Get view params
	const { viewParams } = useAppSelector(state=>state.navigation)

	//Form title string 
	let headerString: string;

	if (names !== null) {
		headerString =
			typeof names === 'string' ? names : `${names[0]} \: ${names[1]}`;
	} else {
		headerString = '';
	};

	//Default
	let ButtonToRender: JSX.Element = <></>;


	switch (currentView) {
		case 'schemas':
			ButtonToRender = (
				<EditSchemaButton
					id={id}
					currentView={currentView}
					buttonStyle='main-button'
				/>
			);
			break;
		case 'all_projects':
			ButtonToRender = (
				<AddProjectButton
					id={id}
					currentView={currentView}
					buttonStyle='main-button'
				/>
			);
			break;
		case 'manage_project':
			ButtonToRender = (
				<div className={styles.popupManageScreenButtonWrapper}>
					<ExportButton
						id={id}
						currentView={currentView}
						buttonStyle='main-button-inside'
					/>
					<AddSessionButton
						id={id}
						currentView={currentView}
						buttonStyle='main-button-inside'
					/>  
					<DeleteProjectButton
						id={id}
						currentView={currentView}
						buttonStyle='main-button-inside'
					/>
				</div>
			);

			break;
		case 'manage_session':
			ButtonToRender = (
				<div className={styles.popupManageScreenButtonWrapper}>
					<ExportButton
						id={id}
						currentView={currentView}
						buttonStyle='main-button-inside'
					/>
					<DeleteSessionButton
						projectId={viewParams.id}
						sessionId={id}
						currentView={currentView}
						buttonStyle='main-button-inside'
					/>
				</div>
			);
			break;
		case 'manage_schema':
			ButtonToRender = (
				<div className={styles.popupManageScreenButtonWrapper}>
					<EditSchemaButton
						id={id}
						currentView={currentView}
						buttonStyle='main-button-inside'
					/>
					<DeleteSchemaButton
						id={id}
						currentView={currentView}
						buttonStyle='main-button-inside'
					/>
				</div>
			);
			break;
		default:
			ButtonToRender = <></>;
			break;
	}

	//Option buttons to render helper
	const OptionsToRender = (id: string) => {
		switch (currentView) {
			case 'schemas':
				return <button>Edit</button>;
			case 'all_projects':
				return (
					<>
						<ViewDetailsButton
							targetView='manage_project'
							id={id}
						>
							View Details
						</ViewDetailsButton>
						<SetCurrentProjectButton id={id} />
					</>
				);
			case 'manage_project':
				return (
					<ViewDetailsButton
						targetView='manage_session'
						id={id}
					>
						View Details
					</ViewDetailsButton>
				);
			case 'manage_session':
				return (
					<ViewDetailsButton
						targetView='capture'
						id={id}
					>
						View Details
					</ViewDetailsButton>
				);

			default:
				return <button>Export</button>;
		}
	};

	return (
		<article className={styles.popupManageScreenContainer}>
			<div className={styles.popupManageScreenHeader}>
				<h2>{title}</h2>
				<h3>{headerString}</h3>
				<div className={styles.popupManageScreenHeadersInner}>
					<h3>{tableHeaders[0]} </h3>
					<h3>{tableHeaders[1]}</h3>
					<h3>{tableHeaders[2]} </h3>
				</div>
			</div>

			<div className={styles.scrollContainer}>
				<div className={styles.popupManageScreenContent}>
					{tableRowData.length > 0 ? (
						tableRowData.map((data) => {
							return (
								<div className={styles.popupManageScreenContentRow} key={data.id}>
									<h4 className={styles.popupColumnOne}>{data.name}</h4>
									<div className={styles.popupColumnTwo}>{data.description}</div>
									<div className={styles.popupColumnThree}>{OptionsToRender(data.id)}</div>
								</div>
							);
						})
					) : (
						<p>No Content</p>
					)}
				</div>
			</div>

			{/* Render button depending on type of view */}
			{ButtonToRender}
		</article>
	);
};

export default ContentTemplate;
