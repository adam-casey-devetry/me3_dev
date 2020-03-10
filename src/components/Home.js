import React, { Fragment } from "react";
import PhotoGrid from "./PhotoGrid";

import { API } from "aws-amplify";

import "../index.css";

export default function Home(props) {
  if (props.auth.isAuthenticated) {
    console.log("User is authenticated");
    let apiName = "adamTestAPI_West";
    let path = "/user/{id}";
    let myInit = {
      // OPTIONAL
      headers: {
<<<<<<< Updated upstream
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
=======
        "Content-Type": "application/json"
>>>>>>> Stashed changes
      }, // OPTIONAL
      response: true, // OPTIONAL (return the entire Axios response object instead of only response.data)
      queryStringParameters: {
        // OPTIONAL
        id: "2"
      }
    };
    API.get(apiName, path, myInit)
      .then(response => {
<<<<<<< Updated upstream
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Credentials", "true");
        response.setHeader(
          "Access-Control-Allow-Methods",
          "GET,HEAD,OPTIONS,POST,PUT"
        );
        response.setHeader(
          "Access-Control-Allow-Headers",
          "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
        );
=======
>>>>>>> Stashed changes
        console.log("GET response: " + JSON.stringify(response));
      })
      .catch(error => {
        console.log("Error: " + error);
      });
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
