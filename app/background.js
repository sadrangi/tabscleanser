// chrome.runtime.onInstalled.addListener((reason) => {
//     if (reason === chrome.runtime.OnInstalledReason.INSTALL) {
//         alert("you installed!")
//     }
// }); 
chrome.tabs.onActivated.addListener(activeInfo => move(activeInfo));
chrome.action.onClicked.addListener((tab) => handleClick(tab))

async function handleClick(tab) {
  try{
    await chrome.tabs.query({windowId: chrome.windows.WINDOW_ID_CURRENT}, (tabs) => {
      const num_tabs = tabs.length 
      for (let i = Math.ceil(num_tabs / 2); i < num_tabs; i++ ){
        chrome.tabs.remove(tabs[i].id)
      }
        // chrome.storage.local.set({num_tabs : tabs.length()}), function(){
        //     chrome.tabs.executeScript({
        //         file: "content.js"
        //     });
        // }

    
    })
  }
  catch(error){
    console.log(error)
  }
   
    
}

async function move(activeInfo) {
  try {
    await chrome.tabs.move(activeInfo.tabId, {index: 0});
    console.log('Success.');
  } catch (error) {
    if (error == 'Error: Tabs cannot be edited right now (user may be dragging a tab).') {
      setTimeout(() => move(activeInfo), 50);
    }
  }
}

