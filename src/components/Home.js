import React, { Fragment } from "react";
import Hero from "./Hero";

export default function Home() {
  return (
    <Fragment>
      <Hero />
      <div className="box cta">
        <p className="has-text-centered"></p>
      </div>
    </Fragment>
  );
}
