import React from 'react';

const CaptureView = () => {
	return (
		<>
			<li>
				<div>
					<label>Select Schema:</label>
				</div>
				<div>
					<select>{/* List of schemas to edit here */}</select>
				</div>
			</li>
			<li>
				<div>
					<label>Name:</label>
				</div>
				<div>
					<input
						type='text'
						placeholder='Enter schema name'
					/>
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

export default CaptureView;
