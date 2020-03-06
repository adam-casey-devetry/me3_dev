import React from "react";
import { MDBContainer, MDBIframe } from "mdbreact";

const IframePage = () => {
  return (
    <MDBContainer className="text-center">
      <MDBIframe src="https://player.vimeo.com/video/268111200?autoplay=1&amp;loop=1&amp;autopause=0&amp;background=1" />
    </MDBContainer>
  );
};

export default IframePage;

/* export default function Hero() {
  return (
    <section className="hero is-primary">
      <div className="hero-body">
        <div className="container">
          <img src="ASU full logo.png" alt="conserve energy" />
        </div>
      </div>
    </section>
  );
}
<div className="video-responsive">
<div style={{ padding: "39.5 0 0 0", position: "relative" }}></div>
</div>

<Iframe
src="https://player.vimeo.com/video/268111200?autoplay=1&amp;loop=1&amp;autopause=0&amp;background=1"
style={{
  position: "relative",
  width: "5000px",
  height: "1000px"
}}
title="Visit ASU"
frameBorder="0"
allowFullScreen="true"
></Iframe> */
