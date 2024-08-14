import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import MyApp from '../App';

describe('Main Extension Views Landing Test', () => {
	test('renders the popup view as expected', () => {
		// Render the App component (simulating the full index.tsx entry point)
		render(<MyApp renderContext='popup' />);

		// Check that PopupView is in the document
		const popupView = screen.getByRole('main', { name: 'Popup view' }); // Adjust to match text in your PopupView component
		expect(popupView).toBeInTheDocument();

		// Check that SidePanel is not in the document
		const sidePanelElement = screen.queryByRole('main', {
			name: 'Side Panel view',
		});
		expect(sidePanelElement).not.toBeInTheDocument();
	});

	test('renders the back button as expected', () => {
		// Render the App component (simulating the full index.tsx entry point)
		render(<MyApp renderContext='popup' />);

		// Check that back button is in the document
		const backButton = screen.getByRole('button', { name: /back/i });
		expect(backButton).toBeInTheDocument();
	});

	test('renders the github button as expected', () => {
		render(<MyApp renderContext='popup' />);

		// Check that github button is in the document
		const popupView = screen.getByRole('button', { name: /github/i });
		expect(popupView).toBeInTheDocument();
	});

	test('renders default footer buttons', () => {
		render(<MyApp renderContext='popup' />);

		//Get all buttons in main screen footer
		const createSchemaButton = screen.getByRole('button', {
			name: /create schema/i,
		});
		const scrapeButton = screen.getByRole('button', { name: /scrape/i });
		const manageProjectsButton = screen.getByRole('button', {
			name: /manage projects/i,
		});

		//Check buttons are in documents
		expect(createSchemaButton).toBeInTheDocument();
		expect(scrapeButton).toBeInTheDocument();
		expect(manageProjectsButton).toBeInTheDocument();
	});

	

	/* Side panel main views */

	test('renders the side panel view as expected', () => {
		// Render the App component (simulating the full index.tsx entry point)
		render(<MyApp renderContext='side panel' />);

		// Check that SidePanel is in the document
		const sidePanelElement = screen.getByRole('main', {
			name: 'Side Panel view',
		}); // Adjust to match text in your SidePanel component
		expect(sidePanelElement).toBeInTheDocument();

		// Check that PopupView is not in the document
		const popupElement = screen.queryByRole('main', { name: 'Popup view' }); // Adjust to match text in your PopupView component
		expect(popupElement).not.toBeInTheDocument();
	});
});
