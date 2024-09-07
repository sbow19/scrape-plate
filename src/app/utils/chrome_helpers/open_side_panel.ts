const openSidePanel = (view: SidePanelViews)=>{

    chrome.runtime.sendMessage<ServiceWorkerMessage<"open_side_panel">>({
      action: "open_side_panel",
      payload: {
        panel_view: view
      }  
    });

    window.close();
}

export default openSidePanel;