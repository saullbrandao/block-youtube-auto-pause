try {
  //Intercept youtube requests
  browser.webRequest.onBeforeRequest.addListener(
    function (details) {
      //Get last active time from the url
      var lastActiveTime = details.url.match(/lact=([^&#]*)/)

      if (lastActiveTime && lastActiveTime[1] && lastActiveTime[1] != '0') {
        //Change the last active time to 0 in the intercepted requests
        var activeURL = details.url.slice(0, lastActiveTime.index + 5) + '0' + details.url.slice(lastActiveTime.index + 5 + lastActiveTime[1].length)

        //Redirect requests with new lastActiveTime
        return { redirectUrl: activeURL };
      }
    },
    { urls: ["https://www.youtube.com/*", "https://music.youtube.com/*"], types: ["main_frame", "sub_frame", "stylesheet", "script", "image", "object", "xmlhttprequest", "other"] },
    ['blocking']
  );
}

catch (e) {
  console.log("Error! Please contact the developer.")
  throw (e)
}