import React from 'react';

const WelcomeScreen = (): JSX.Element => {
	return (
		<article>
			<h2>Welcome to Quick Scrape!</h2>
			<p> Thank you for choosing Quick Scrape! You can view online tutorials about how to use Quick Scrape via <a>this link</a>, or at any time via the github link above.</p>
            <p>To start scraping, you need to first create your first project. Then you need to create a scraping schema for your target webpage.</p>
			<button>Create your first project</button>
		</article>
	);
};

export default WelcomeScreen;
