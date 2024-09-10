import React from 'react';

const CreatorView: React.FC<SchemaCreatorViewProps> = ({
	schemaName,
	isSchemaNameDuplicate,
	onSchemaNameChange,
	projectList,
	projectSelection,
	projectSelectionList,
	onAddProject: handleAddProject,
	onSelectProject: handleProjectSelect,
	onDeleteProject: handleSchemaDelete,
	url,
	onUrlChange,
}) => {
	return (
		<>
			<li>
				<div>
					<label>Schema Name:</label>
				</div>
				<div>
					<input
						type='text'
						placeholder='Enter Schema Name'
						value={schemaName}
						onChange={(e) => onSchemaNameChange(e)}
					/>
					{/* If schema name  exists, throw alert */}
					{isSchemaNameDuplicate && <p>Schema Name already exists.</p>}
				</div>
			</li>
			<li>
				<div>
					<label>URL:</label>
				</div>
				<div>
					{/* URL fetched from state store */}
					<input
						type='text'
						placeholder='Enter URL...'
						value={url}
						onChange={(e) => onUrlChange(e)}
					/>
				</div>
			</li>
			<li>
				<div>
					<label>Assign Schema to Projects</label>
					<select
						value={projectSelection?.name}
						onChange={(e) => {
							handleProjectSelect(e.target.value);
						}}
					>
						<option
							value=''
							disabled
							selected
						>
							Select a project...
						</option>
						{Object.keys(projectList).map((projectId) => {
							return (
								<option
									key={projectId}
									value={projectList[projectId].name}
								>
									{projectList[projectId].name}
								</option>
							);
						})}
					</select>
					<button onClick={handleAddProject}>Add</button>
				</div>
				<div>
					<ul>
						{/* Selected options go here */}
						{Object.values(projectSelectionList).map((project, index) => {
							return (
								<li
									key={index}
									value={project.name}
								>
									{project.name}
									<button onClick={(e) => handleSchemaDelete(e, project.id)}>
										Remove
									</button>
								</li>
							);
						})}
					</ul>
				</div>
			</li>
		</>
	);
};

export default CreatorView;
