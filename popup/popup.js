// ELEMENTS
const textBoxElement = document.getElementById("textBox")
const startButton = document.getElementById("enableButton")
const stopButton = document.getElementById("disableButton");
const saveButton = document.getElementById("saveButton");
const delayBox = document.getElementById("delayBox");

const prefs = {
  text: textBoxElement.value, //TEST ME
  enabled: false,
};

//FUNCTIONS
function checkIfIsEnabled() {
  console.log("Checking if is enabled...");
  if (startButton.style.display == "flex") {
    console.log("Replacer is enabled.");
    return true;
  }
  else {
    console.log("Replacer is not enabled.");
    return false;
  }
};

//INITAL
window.onload = function () {
  console.log("Popup window loaded.");

  textBoxElement.addEventListener("change", function(e) {
    console.log("Text changed. Prefs: ", prefs);
    prefs.text = textBoxElement.value;
    chrome.storage.local.set(prefs);
  });

  chrome.storage.local.get(["text"], (result) => {
    const { text } = result;

    if (text) {
      textBoxElement.value = text;
      prefs.text = text;
    }
  });

  chrome.storage.local.get(["enabled"], (result) => {
    const { enabled } = result;

    if (enabled == true) {
      console.log("enabled was true");
      startButton.style.display = "none";
      stopButton.style.display = "flex";
      prefs.enabled = enabled;
    }
    else if(enabled == false) {
      console.log("enabled was false");
      startButton.style.display = "flex";
      stopButton.style.display = "none";
      prefs.enabled = enabled;
    }
    else {
      console.warn("enabled was null, defaulting to false");
      startButton.style.display = "flex";
      stopButton.style.display = "none";
      prefs.enabled = false;
    }
  });

  chrome.runtime.sendMessage({ event: "onInit", prefs });
};

startButton.onclick = () => {
  startButton.style.display = "none";
  stopButton.style.display = "flex";
  prefs.enabled = true;
  chrome.runtime.sendMessage({ event: "onStart", prefs });
};

stopButton.onclick = () => {
  startButton.style.display = 'flex';
  stopButton.style.display = 'none';
  prefs.enabled = false;
  chrome.runtime.sendMessage({ event: "onStop", prefs });
};