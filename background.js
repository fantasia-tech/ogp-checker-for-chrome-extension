chrome.runtime.onMessage.addListener((request, sender, sendResponse) =>{
    let metaTags = document.getElementsByTagName("meta");
    let a = [];
    for(let n = 0; n < metaTags.length; n++){
        a.push(metaTags[n].outerHTML);
    }
    chrome.runtime.sendMessage({data: a}).catch((err) => {
        console.log(err);
    });
});
