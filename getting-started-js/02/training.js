// This is sample code from https://dev.apirtc.com/getting-started
// to get started with ApiRTC !

var userAgent = new apiRTC.UserAgent({
  uri: "apiKey:" + "myDemoApiKey"
});

// Create local stream with video only
userAgent
  .createStream({ constraints: { audio: false, video: true } })
  .then((localStream) => {
    // Display local Stream
    localStream.attachToElement(document.getElementById("local-stream"));
  });


