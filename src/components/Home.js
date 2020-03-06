import React, { Fragment } from "react";
import IframePage from "./IframePage";
import "../index.css";

export default function Home() {
  return (
    <Fragment>
      <div className="box cta">
        <IframePage />
        <p className="has-text-centered"></p>
      </div>
    </Fragment>
  );
}
