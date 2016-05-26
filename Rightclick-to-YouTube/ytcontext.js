document.addEventListener('DOMContentLoaded', fireContentLoadedEvent, false);

function fireContentLoadedEvent () {
  document.body.addEventListener("mouseup", mouseup_send_text, false);
  document.body.addEventListener("mousedown", mouseup_send_text, false);

}

function mouseup_send_text(e) {
  s = window.getSelection();
  text = s.toString();
  chrome.extension.sendMessage({
      "type": "selectText",
      "data": text,
  });
}