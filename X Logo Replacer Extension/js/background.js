//SAVE DATA
chrome.runtime.onMessage.addListener(data => {
    const { event, prefs } = data 
    switch (event) {
        case 'onInit':
          handleOnInit(prefs);
          break;
        case 'onStop':
          handleOnStop(prefs);
          break;
        case 'onStart':
          handleOnStart(prefs);
          break;
        case 'onSave':
          handleOnSave(prefs);
          break;
        default:
            break;
    }
})

const handleOnInit = (prefs) => {
  console.log("background.js received popup init message. Prefs: ", prefs);
};

const handleOnStop = (prefs) => {
  console.log("Saving prefs: ", prefs);
  chrome.storage.local.set(prefs);
}

const handleOnStart = (prefs) => {
  console.log("Saving prefs: ", prefs);
  chrome.storage.local.set(prefs);
};

const handleOnSave = (prefs) => {
  console.log("Saving prefs: ", prefs);
  chrome.storage.local.set(prefs);
};

