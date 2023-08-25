import React, { Component } from "react";
import videoJS from "video.js";

import { options } from "./constants";
import "video.js/dist/video-js.css";

import "videojs-contrib-quality-levels";
import "videojs-http-source-selector";

class VideoPlayer extends Component {
  videoPlayer;
  constructor(props) {
    super(props);
    this.state = {
      sourceUrl:
        "https://dev-octopus-da-destination-bucket.b-cdn.net/5b4f6d55-02dc-433b-a75c-c8f4d6fcfcfb/dash/5b4f6d55-02dc-433b-a75c-c8f4d6fcfcfb.mpd"
    };
  }

  componentDidMount() {
    this.setupVideoPlayer();
  }

  setupVideoPlayer = () => {
    this.videoPlayer = videoJS("sandbox-example-video", options, () => {
      console.log("HELLO");
    });
    this.initializePlugins();
  };

  initializePlugins = () => {
    this.videoPlayer.httpSourceSelector();
  };

  updateSourceUrl = (sourceUrl) => {
    this.setState({
      sourceUrl: sourceUrl
    });
  };

  getBlobURL = async (code, type) => {
    let response = await fetch(
      "https://dash.akamaized.net/dash264/TestCasesHD/2b/qualcomm/1/MultiResMPEG2.mpd"
    );
    let xml = await response.text();
    const blob = new Blob([xml], { type: "application/dash+xml" });
    const url = URL.createObjectURL(blob);
    return url;
  };

  renderSource = () => {
    return <source src={this.state.sourceUrl} type={"application/dash+xml"} />;
  };

  changeUrl = () => {
    const blobUrl = this.getBlobURL(
      "https://media-content.onthegomodel.com/otg_prod/CCBP-Session12-Static-Website/CCBP-Session-12-StaticWebsite-Telugu/video.mpd",
      "application/dash+xml"
    ).then((data) => {
      this.updateSourceUrl(data);
    });
  };

  render() {
    return (
      <div>
        <p>SOURCE URL: {this.state.sourceUrl}</p>
        <button onClick={this.changeUrl}>Change URL</button>
        <video
          alt={`${"sandbox"} - video`}
          className={`${"video-js"} ${"vjs-default-skin"} ${"vjs-big-play-centered"}`}
          controls
          preload={"auto"}
          id={"sandbox-example-video"}
          width={640}
          height={320}
          data-setup="{}"
          playsInline
          data-vjs-player
        >
          {this.renderSource()}
        </video>
      </div>
    );
  }
}

export default VideoPlayer;
