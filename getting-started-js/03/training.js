// This is sample code from https://dev.apirtc.com/getting-started
// to get started with ApiRTC !

var userAgent = new apiRTC.UserAgent({
  uri: "apiKey:" + "myDemoApiKey"
});

// Create local Stream with video only
userAgent
  .createStream({ constraints: { audio: false, video: true } })
  .then((localStream) => {
    // Display local Stream
    localStream.attachToElement(document.getElementById("local-stream"));

    // Connect with ApiRTC
    userAgent.register().then((session) => {
      // Get the Conversation
      var conversation = session.getOrCreateConversation("MY_CONVERSATION");

      // Join the Conversation
      conversation.join().then(() => {
        // Publish the local Stream
        conversation.publish(localStream).then((publishedLocalStream) => {
          console.log("published", publishedLocalStream)
        }).catch((error) => {
          console.error("publish error", error)
        });
      }).catch(error => {
        console.error("join error", error)
      });

      // Subscribe to remote Streams
      conversation.on("streamListChanged", (streamInfo) => {
        if (streamInfo.isRemote === true) {
          if (streamInfo.listEventType === "added") {
            conversation.subscribeToStream(streamInfo.streamId);
          }
        }
      });
      conversation.on("streamAdded", (remotestream) => {
        remotestream.addInDiv('remote-streams', 'remote-stream-' + remotestream.getId(), {}, false);
      });
      conversation.on("streamRemoved", (remotestream) => {
        remotestream.removeFromDiv('remote-streams', 'remote-stream-' + remotestream.getId());
      });
    });

  });


