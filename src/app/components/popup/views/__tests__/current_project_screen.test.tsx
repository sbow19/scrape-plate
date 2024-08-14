import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CurrentProjectScreen from '../current_project_screen';
import { projectList, projectDetails, emptyProjectDetails, mockInputChangeHandler } from '#mocks/dummyData';

describe('Current Project Screen View', () => {
	test('renders the current project screen view correctly with current project data', () => {
		// Render the WelcomeScreenContainer component
		render(
			<CurrentProjectScreen
				currentProject={projectDetails}
				projectList={projectList}
				onChange={mockInputChangeHandler}
				inputText={{projectText: "DUMMY", sessionText: "Session1", schemaText: "Companies_House"}}
			/>,
		);

		/** Check for correct buttons */
		const allButtons = screen.getAllByRole('button');

		//Check whether all buttons with expected test appear in render
		const expectedText = [
			/view session/i,
			/view project/i,
			/view schema/i,
			/export/i,
		];
		const result = expectedText.every((expText) => {
			//Check if expected text matches any of the buttons. If it doesn't then button hasn't rendered.
			for (const button of allButtons) {
				const buttonText = button.textContent ?? 'NULL';
				const match = expText.test(buttonText);

				if (match) {
					return true;
				}
			}
			return false;
		});

		if (!result) {
			throw new Error('Expected button did not appear');
		}

		/* Check for combobox inputs and their default values */
		//Project list label
		const projectLabel = screen.getByLabelText(/Project:/i);
		expect(projectLabel).toBeInTheDocument();

		//Project list combobox
		const projectInput = screen.getByRole('combobox', {
			name: /Project:/i,
		});
		expect(projectInput).toBeInTheDocument();

		//Session name label
		const sessionNameLabel = screen.getByLabelText(/Session:/i);
		expect(sessionNameLabel).toBeInTheDocument();

		//Session name combobox
		const sessionNameInput = screen.getByRole('combobox', {
			name: /Session:/i,
		});
		expect(sessionNameInput).toBeInTheDocument();

		//Schema name label
		const schemaNameLabel = screen.getByLabelText(/schema:/i);
		expect(schemaNameLabel).toBeInTheDocument();

		//Schema name combobox
		const schemaNameDropdown = screen.getByRole('combobox', {
			name: /schema/i,
		});
		expect(schemaNameDropdown).toBeInTheDocument();

	});

	test('renders the current project screen view correctly with no current project data', () => {
		
		// Render the WelcomeScreenContainer component
		render(
			<CurrentProjectScreen
				currentProject={emptyProjectDetails}
				projectList={projectList}
				onChange={mockInputChangeHandler}
				inputText={{projectText: "DUMMY", sessionText: "Session1", schemaText: "Companies_House"}}
			/>,
		);

		/** Check for correct buttons */
		const allButtons = screen.getAllByRole('button');

		//Check whether all buttons with expected test appear in render
		const expectedText = [
			/view session/i,
			/view project/i,
			/view schema/i,
			/export/i,
		];
		const result = expectedText.every((expText) => {
			//Check if expected text matches any of the buttons. If it doesn't then button hasn't rendered.
			for (const button of allButtons) {
				const buttonText = button.textContent ?? 'NULL';
				const match = expText.test(buttonText);

				if (match) {
					return true;
				}
			}
			return false;
		});

		if (!result) {
			throw new Error('Expected button did not appear');
		}

		/* Check for combobox inputs and their default values */
		//Project list label
		const projectLabel = screen.getByLabelText(/Project:/i);
		expect(projectLabel).toBeInTheDocument();

		//Project list combobox
		const projectInput = screen.getByRole('combobox', {
			name: /Project:/i,
		});
		expect(projectInput).toBeInTheDocument();

		//Session name label
		const sessionNameLabel = screen.getByLabelText(/Session:/i);
		expect(sessionNameLabel).toBeInTheDocument();

		//Session name combobox
		const sessionNameInput = screen.getByRole('combobox', {
			name: /Session:/i,
		});
		expect(sessionNameInput).toBeInTheDocument();

		//Schema name label
		const schemaNameLabel = screen.getByLabelText(/schema:/i);
		expect(schemaNameLabel).toBeInTheDocument();

		//Schema name combobox
		const schemaNameDropdown = screen.getByRole('combobox', {
			name: /schema:/i,
		});
		expect(schemaNameDropdown).toBeInTheDocument();
	});

	test('test project name search input', () => {

        // Render the WelcomeScreenContainer component
		render(
			<CurrentProjectScreen
				currentProject={projectDetails}
				projectList={projectList}
				onChange={mockInputChangeHandler}
				inputText={{projectText: "DUMMY", sessionText: "Session1", schemaText: "Companies_House"}}
			/>,
		);

        //Project list label
		const projectLabel = screen.getByLabelText(/Project:/i);
		expect(projectLabel).toBeInTheDocument();

		//Project list combobox
		const projectInput = screen.getByRole('combobox', {
			name: /Project:/i,
		});
		expect(projectInput).toBeInTheDocument();

		// Get datalist
		const dummyDatalist = screen.getByTestId('project_list');
		expect(dummyDatalist).toBeInTheDocument();

		//Get options 
		const option1 = screen.getByTestId("DUMMY");
		const option2 = screen.getByTestId("PROJECT1");
		const option3 = screen.getByTestId("BAD2");

		expect(option1).toBeInTheDocument();
        expect(option2).toBeInTheDocument();
        expect(option3).toBeInTheDocument();
        

	});

	test('test session name search input', () => {
        // Render the WelcomeScreenContainer component
		render(
			<CurrentProjectScreen
				currentProject={projectDetails}
				projectList={projectList}
				onChange={mockInputChangeHandler}
				inputText={{projectText: "DUMMY", sessionText: "Session1", schemaText: "Companies_House"}}
			/>,
		);

        //Session name label
		const sessionNameLabel = screen.getByLabelText(/Session:/i);
		expect(sessionNameLabel).toBeInTheDocument();

		//Session name combobox
		const sessionNameInput = screen.getByRole('combobox', {
			name: /Session:/i,
		});
		expect(sessionNameInput).toBeInTheDocument();
        
        
		//* Test user interactions */
		// Get datalist
		const dummyDatalist = screen.getByTestId('session_list');
		expect(dummyDatalist).toBeInTheDocument();

		//Get options 
		const option1 = screen.getByTestId("Session1");
		const option2 = screen.getByTestId("Session2");
		const option3 = screen.getByTestId("Session3");

		expect(option1).toBeInTheDocument();
        expect(option2).toBeInTheDocument();
        expect(option3).toBeInTheDocument();
	


    });

	test('test schema name search input', () => {
        // Render the WelcomeScreenContainer component
		render(
			<CurrentProjectScreen
				currentProject={projectDetails}
				projectList={projectList}
				onChange={mockInputChangeHandler}
				inputText={{projectText: "DUMMY", sessionText: "Session1", schemaText: "Companies_House"}}
			/>,
		);

        //Schema name label
		const schemaNameLabel = screen.getByLabelText(/schema:/i);
		expect(schemaNameLabel).toBeInTheDocument();

		//Schema name combobox
		const schemaNameDropdown = screen.getByRole('combobox', {
			name: /schema:/i,
		});
		expect(schemaNameDropdown).toBeInTheDocument();
        
        
		//* Test user interactions */
		// Get datalist
		const dummyDatalist = screen.getByTestId('schema_list');
		expect(dummyDatalist).toBeInTheDocument();

		//Get options 
		const option1 = screen.getByTestId("Companies_House");
		const option2 = screen.getByTestId("ASIC");
		const option3 = screen.getByTestId("Blah blah blah");

		expect(option1).toBeInTheDocument();
        expect(option2).toBeInTheDocument();
        expect(option3).toBeInTheDocument();
    });
});
