chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    console.log(tabs[0]);
    let tab = tabs[0];
    let sendMsg = chrome.tabs.sendMessage(tab.id, {execute: 'getMeta'});
    sendMsg.catch((err) => {
        console.log(err);
    });
});
chrome.runtime.onMessage.addListener((request) => {
    document.getElementById("results").value = request.data;
    let metaTags = request.data;
    document.getElementById('count').append(metaTags.length);
    for(let i = 0; i < metaTags.length; i++) {
        let metaTag = metaTags[i];
        const tempEl = document.createElement('div');
        tempEl.innerHTML = metaTag;
        let property = tempEl.firstElementChild.getAttribute('property');
        console.log(property);
        if(/^og:.+/.test(property)) {
            let td = document.createElement('td');
            let ogpType = property.match(/^og:(.+)/)[1];
            if(/^image$/.test(ogpType)) {
                let imageUrl = tempEl.firstElementChild.getAttribute('content');
                let img = document.createElement('img');
                img.src = imageUrl;
                td.append(img);
            } else {
                td.append(metaTag);
            }
            let tr = document.createElement('tr');
            tr.append(td);
            document.getElementById('list').append(tr);
        }
    }
    return false;
});
