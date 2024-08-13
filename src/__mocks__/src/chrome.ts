//Chrome API mocked calls

//Mock Chrome object
global.chrome = {
	tabs: {
		query: jest.fn().mockImplementation(tabsQuery),
		executeScript: jest.fn().mockImplementation(executeScript),
        insertCSS: jest.fn().mockImplementation(insertCSS),
    },
	action: {

    },
    runtime: {
        onMessage: {
            addListener: jest.fn().mockImplementation(runtimeOnMessage)
        }
    },
    webNavigation: {
        onCompleted:  {
            addListener: jest.fn().mockImplementation(onCompleteListener)
        }
    }
};

/**
 * Implementations
 * 
 * Mock the implementations of Chrome API methods here.
 * 
 * Refactor to extract each API segment into separate modules
 * 
 */

/* Tabs API */

function tabsQuery(){

}

function executeScript(){

}

function insertCSS(){

}

/* Runtime API */

function runtimeOnMessage(callback){

    // Validate that callback is a function
    if (typeof callback !== 'function') {
    throw new TypeError('Callback must be a function');
    }

    //True if callback registered successfully
    return true

}

/* Web Navigation API */

function onCompleteListener(callback, filters = {}): boolean{

    // Validate that callback is a function
    if (typeof callback !== 'function') {
        throw new TypeError('Callback must be a function');
    }

    //True if callback registered successfully
    return true
}
