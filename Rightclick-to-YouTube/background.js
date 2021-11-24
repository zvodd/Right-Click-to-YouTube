

var searchProviders = [
    {
        name:"Youtube",
        furl: "http://www.youtube.com/results?search_query={search}"
    },
    {
        name:"ebay",
        furl:"http://www.ebay.com/sch/?_nkw={search}"
    }
]

function menuHandlerFunc(provider){

    function format(str, args) {
        for (const arg in args) str = str.replace(new RegExp(`\\{${arg}\\}`, 'gi'), args[arg])
      return str
    }

    return function searchClickHandler(info, tab) {
        var newURL = format(provider.furl, {search: info.selectionText});
        chrome.tabs.create({
            url: newURL,
            selected: true,
            index: tab.index + 1
        });
    }
    
}


chrome.contextMenus.removeAll(
    function() {
        let root = chrome.contextMenus.create({
            title: "Search “%s”",
            contexts: ["selection"],
            // onclick: searchClickHandler
        });
        for (let sp of searchProviders){
            chrome.contextMenus.create({
                parentId: root,
                title: sp.name, // todo escape % ??
                contexts: ["selection"],
                onclick: menuHandlerFunc(sp)
            })
        }
    }
);

