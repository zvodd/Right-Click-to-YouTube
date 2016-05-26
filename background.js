var context_menu_item;
var text;
var _old_text;
var undefined = (function(undefined){return undefined}());
chrome.extension.onMessage.addListener(main_listener);

function main_listener(req, sender, callback) {
	text = req.data;
	if (text != _old_text){
		remove_context_menu();
	}
	_old_text = text;
	if (text.length > 0) {
		if (typeof context_menu_item === "undefined"){
			context_menu_item = chrome.contextMenus.create({
				"contexts": ["selection"],
				"title": "Search YouTube For “"+text+"”",
				"onclick": searchClickHandler
			});
		}
	}else{
		remove_context_menu();
	}
	// callback({text});
}

function remove_context_menu(){
	if (typeof context_menu_item !== "undefined") {
		chrome.contextMenus.remove(context_menu_item);
		context_menu_item = undefined;
	}
}

function searchClickHandler(info, tab) {
	var newURL = "http://www.youtube.com/results?search_query="+text;
    chrome.tabs.create({ url: newURL });
    remove_context_menu();
}