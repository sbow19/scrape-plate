import React from 'react';
import * as styles from '#styles/popup.module.css';
import AddProjectButton from '#components/buttons/add_project_button';
import EditSchemaButton from '#components/buttons/edit_schema_button';
import ExportButton from '#components/buttons/export_button';
import SetCurrentProjectButton from '#components/buttons/set_current_project_button';
import ViewDetailsButton from '#components/buttons/view_details_button';

const ContentTemplate: React.FC<ContentContainerProps> = ({ content }) => {
	const { currentView, title, tableHeaders, tableRowData, id } = content;

	let ButtonToRender: JSX.Element = <></>;

	switch (currentView) {
		case 'schemas':
			ButtonToRender = (
				<EditSchemaButton
					id={id}
					currentView={currentView}

				/>
			);
			break;
		case 'all_projects':
			ButtonToRender = (
				<AddProjectButton
					id={id}
					currentView={currentView}
					
				/>
			);
			break;
		case 'manage_project':
			ButtonToRender = (
				<ExportButton
					id={id}
					currentView={currentView}
				/>
			);
			break;
		case 'manage_session':
		default:
			ButtonToRender = (
				<ExportButton
					id={id}
					currentView={currentView}
				/>
			);
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
							targetView='project'
							id={id}
						/>
						<SetCurrentProjectButton id={id} />
					</>
				);
			case 'manage_project':
				return (
					<ViewDetailsButton
						targetView='session'
						id={id}
					/>
				);
			case 'manage_session':
				return (
					<ViewDetailsButton
						targetView='capture'
						id={id}
					/>
				);
			default:
				return <button>Export</button>;
		}
	};

	return (
		<article className={styles.popupManageScreenContainer}>
			<div className={styles.popupManageScreenHeader}>
				<h2>{title}</h2>
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
								<div key={data.id}>
									<h4>{data.name}</h4>
									<div>{data.description}</div>
									<div>{OptionsToRender(data.id)}</div>
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
