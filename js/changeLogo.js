function isSubdomain(url) {
  try {
    const urlObject = new URL(url);
    return urlObject.hostname.split(".").length > 2;
  } catch (error) {
    return false;
  }
}

function changeLogo() {
  if (document.URL.includes("twitter.com") || document.URL.includes("x.com")) {
    if (!isSubdomain(document.URL)) {
      console.log("X Logo Replacer found Twitter!");

      const logoElements = document.getElementsByClassName(
        "r-1nao33i r-4qtqp9 r-yyyyoo r-16y2uox r-8kz0gk r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-lrsllp"
      );
      
      if (logoElements.length == 0) { //If no elements were found,
        console.log("Failed to find logo.");
        setTimeout(changeLogo, 500); //Try again
      } else {
        for (let i of logoElements) { //For every element found (in case there are multiple)
          chrome.storage.local.get(["enabled"], (result) => {
            const { enabled } = result;
            if (enabled == true) { //If the extension is enabled
              chrome.storage.local.get(["text"], (result) => {
                const { text } = result;
                if (text) {
                  i.replaceWith(text); //Replace the element with text
                }
              });
            }
          });
        }
      }
    }
  }
}

changeLogo();