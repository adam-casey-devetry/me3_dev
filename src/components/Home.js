import React, { Fragment } from "react";
import PhotoGrid from "./PhotoGrid";
import "../index.css";

export default function Home(props) {
  if (props.auth.isAuthenticated) {
    console.log("User is authenticated");
  } else {
    console.log("User is NOT authenticated");
  }

  return (
    <Fragment>
      <div className="box cta">
        <p className="has-text-centered"></p>
        <PhotoGrid />
      </div>
    </Fragment>
  );
}
