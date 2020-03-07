import React, { Fragment } from "react";
import PhotoGrid from "./PhotoGrid";
import "../index.css";

export default function Home() {
  return (
    <Fragment>
      <div className="box cta">
        <p className="has-text-centered"></p>
        <PhotoGrid />
      </div>
    </Fragment>
  );
}
