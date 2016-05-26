function searchClickHandler(info, tab) {
    var newURL = "http://www.youtube.com/results?search_query=" + info.selectionText;
    chrome.tabs.create({
        url: newURL,
        selected: true,
        index: tab.index + 1
    });
}


chrome.contextMenus.removeAll(
    function() {
        var id = chrome.contextMenus.create({
            title: "Search YouTube for “%s”",
            contexts: ["selection"],
            onclick: searchClickHandler
        });
    }
);