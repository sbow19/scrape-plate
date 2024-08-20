chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
    chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
        chrome.sidePanel.open({ tabId: tab.id });
    });
});
export {};
