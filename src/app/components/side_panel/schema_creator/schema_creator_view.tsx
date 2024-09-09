import React from 'react';

const CreatorView = () => {
	return (
		<>
			<li>
				<div>
					<label>Schema Name:</label>
				</div>
				<div>
					<input/>
				</div>
			</li>
			<li>
				<div>
					<label>URL:</label>
				</div>
				<div>
					<input
						type='text'
						placeholder='Enter URL'
					/>
				</div>
			</li>
		</>
	);
};

export default CreatorView;
