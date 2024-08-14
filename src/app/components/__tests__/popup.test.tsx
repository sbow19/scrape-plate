import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import MainPopupView from '#components/popup/main';


describe('Popup Content View', () => {
	test('Welcome screen renders when there is no state', () => {
		render(
			<MainPopupView/>
		);

		//Check that welcome menu renders as expected
		const welcomeMenu = screen.getByRole('heading', {
			name: /Welcome to Quick Scrape/i,
		});
		const createNewProjectButton = screen.getByRole('button', {
			name: /Create your first project/!,
		});

		expect(welcomeMenu).toBeInTheDocument();
		expect(createNewProjectButton).toBeInTheDocument();

		//Collects all content screens in document and filters out welcome screen
		// Get all heading elements
		const allHeadings = screen.getAllByRole('heading');

		//Filter out Quick Scraper main header and Current Project header
		const otherScreens = allHeadings.filter((heading) => {
			const textContent = heading.textContent ?? '';
			const isExcluded =
				/Welcome to Quick Scrape|Quick Scrape|Thank you for choosing Quick Scrape!/i.test(
					textContent,
				);
			return !isExcluded;
		});

		//Checks if content screens other than content
		otherScreens.forEach((contentScreen) => {
			expect(contentScreen).not.toBeInTheDocument();
		});
	});

	test('Project screen renders when there is state', () => {
		render(<MainPopupView/>);

		//Check that welcome menu renders as expected
		const projectMenu = screen.getByRole('heading', {
			name: /Current Project/i,
		});
		expect(projectMenu).toBeInTheDocument();

		//Collects all content screens in document and filters out current project screen
		// Get all heading elements
		const allHeadings = screen.getAllByRole('heading');

		//Filter out Quick Scraper main header and Current Project header
		const otherScreens = allHeadings.filter((heading) => {
			const textContent = heading.textContent ?? '';
			const isExcluded = /Current Project|Quick Scrape/i.test(textContent);
			return !isExcluded;
		});

		//Checks if content screens other than content
		otherScreens.forEach((contentScreen) => {
			expect(contentScreen).not.toBeInTheDocument();
		});
	});
});
