const openSidePanel = ()=>{

    
    chrome.runtime.sendMessage<ServiceWorkerMessage<"open_side_panel">>({
      action: "open_side_panel",
      payload: null  
    });

    window.close();
}

export default openSidePanel;